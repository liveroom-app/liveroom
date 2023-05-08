import { JoinCallHook } from "./joinCallHook";
import { InitUserHook } from "./initUserHook";
import { TrackCursorsHook } from "./trackCursorsHook";
import { AnimateBackgroundHook } from "./animateBackgroundHook";
import { BroadcastHoveredHook, BroadcastFocusedHook } from "./broadcastHooks";
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
  BroadcastFocusedHook,
  HandleOfferRequestHook,
  AnimateBackgroundHook,
  HandleIceCandidateOfferHook,
};
