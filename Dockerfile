
ARG ELIXIR_VERSION="1.14.4"
ARG ERLANG_VERSION="26.0"
ARG ALPINE_VERSION="3.18.0"

# NOTE: "We use Ubuntu/Debian instead of Alpine to avoid DNS resolution issues in production."
#       from generated Dockerfile by Phoenix.
#       For the moment, let's try Alpine anyway.
#       Check which version is available on https://hub.docker.com/r/hexpm/elixir/tags?page=1&name=1.14.4-erlang-26.0-alpine.
#
# ARG BUILDER_IMAGE="hexpm/elixir:${ELIXIR_VERSION}-erlang-${ERLANG_VERSION}-debian-bullseye-20210902-slim"
# ARG RUNNER_IMAGE="debian:bullseye-20210902-slim"
#
ARG BUILDER_IMAGE="hexpm/elixir:${ELIXIR_VERSION}-erlang-${ERLANG_VERSION}-alpine-${ALPINE_VERSION}"
ARG RUNNER_IMAGE="alpine:${ALPINE_VERSION}"

############
### deps ###
############
FROM ${BUILDER_IMAGE} AS deps

WORKDIR /app
RUN apk add --no-progress --update git build-base

ARG MIX_ENV="prod"

# install rebar & hex
RUN mix local.rebar --force && \
    mix local.hex --force

# install elixir dependencies
COPY mix.exs mix.lock ./
RUN mix deps.get --only ${MIX_ENV}

# compile elixir dependencies
COPY config/config.exs config/${MIX_ENV}.exs config/
RUN mix deps.compile

####################
### build-elixir ###
####################
FROM deps AS build-elixir

COPY lib lib

ARG MIX_ENV="prod"
RUN mix compile

####################
### build-assets ###
####################
FROM deps AS build-assets

# # install Nodejs
# ARG NODE_VERSION="17.9.0"
# RUN apk add --update nodejs-current=~${NODE_VERSION} npm && npm i -g npm

# # install npm dependencies
# COPY assets/package.json assets/package-lock.json assets/
# RUN npm install --prefix assets --no-fund --no-audit

ARG MIX_ENV="prod"

# install Tailwind & Esbuild
RUN mix assets.setup

COPY priv priv
# NOTE: 'lib' is needed to see Tailwind classes usage in the code
COPY lib lib
COPY assets assets

RUN mix assets.deploy

###############
### release ###
###############
FROM build-elixir AS release

COPY rel rel
COPY --from=build-assets /app/priv priv
# NOTE: Changes to config/runtime.exs don't require recompiling the code
COPY config/runtime.exs config/

ARG MIX_ENV="prod"
RUN mix release

############################
### runner (final image) ###
############################
FROM ${RUNNER_IMAGE}

WORKDIR /app
RUN chown nobody /app
RUN apk add --no-cache libstdc++ openssl ncurses-libs

# NOTE: Set the locale
# RUN sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen && locale-gen
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

ARG MIX_ENV="prod"
COPY --from=release --chown=nobody:root /app/_build/${MIX_ENV}/rel/liveroom .

USER nobody
CMD ["/app/bin/server"]
