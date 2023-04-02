import { JoinCallHook } from "./joinCallHook";
import { InitUserHook } from "./initUserHook";
import { TrackCursorsHook } from "./trackCursorsHook";
import { BroadcastHoveredHook } from "./broadcastHoveredHook";
import {
  HandleAnswerHook,
  HandleSdpOfferHook,
  HandleOfferRequestHook,
  HandleIceCandidateOfferHook,
} from "./videochatHooks";

export const Hooks = {
  JoinCallHook,
  InitUserHook,
  TrackCursorsHook,
  HandleAnswerHook,
  HandleSdpOfferHook,
  BroadcastHoveredHook,
  HandleOfferRequestHook,
  HandleIceCandidateOfferHook,
};
