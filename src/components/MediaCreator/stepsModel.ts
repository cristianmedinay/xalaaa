/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
export enum StepType {
  EmptyStep = "EMPTY_STEP",
  VideoDetails = "VIDEO_DETAILS",
  Images = "IMAGES",
  Creators = "CREATORS",
  Payments = "PAYMENTS",
  Intro = "INTRO",
  Catchup = "CATCHUP",
  Summary = "SUMMARY",
}

export type StepsModel = Array<{
  Id: number;
  subTitleKey: string;
  screenType: StepType;
}>;

export const MAIN_STEPS_MODEL: StepsModel = [
  {
    Id: 0,
    subTitleKey: "Start creating",
    screenType: StepType.EmptyStep,
  },
  {
    Id: 1,
    subTitleKey: "Video details",
    screenType: StepType.VideoDetails,
  },
  {
    Id: 2,
    subTitleKey: "Images",
    screenType: StepType.Images,
  },
  {
    Id: 4,
    subTitleKey: "Creators",
    screenType: StepType.Creators,
  },
  {
    Id: 4,
    subTitleKey: "Payments",
    screenType: StepType.Payments,
  },
  {
    Id: 5,
    subTitleKey: "Intro",
    screenType: StepType.Intro,
  },
  {
    Id: 6,
    subTitleKey: "Catchup",
    screenType: StepType.Catchup,
  },
  {
    Id: 7,
    subTitleKey: "Summary",
    screenType: StepType.Summary,
  },
];

export const LIVE_STEPS_MODEL: StepsModel = [
  {
    Id: 0,
    subTitleKey: "Start creating",
    screenType: StepType.EmptyStep,
  },
  {
    Id: 1,
    subTitleKey: "Video details",
    screenType: StepType.VideoDetails,
  },
  {
    Id: 2,
    subTitleKey: "Images",
    screenType: StepType.Images,
  },
  {
    Id: 3,
    subTitleKey: "Creators",
    screenType: StepType.Creators,
  },
  {
    Id: 4,
    subTitleKey: "Payments",
    screenType: StepType.Payments,
  },
  {
    Id: 5,
    subTitleKey: "Intro",
    screenType: StepType.Intro,
  },
  {
    Id: 6,
    subTitleKey: "Catchup",
    screenType: StepType.Catchup,
  },
  {
    Id: 7,
    subTitleKey: "Summary",
    screenType: StepType.Summary,
  },
];

export const VIDEO_PREMIERE_STEPS_MODEL: StepsModel = [
  {
    Id: 0,
    subTitleKey: "Start creating",
    screenType: StepType.EmptyStep,
  },
  {
    Id: 1,
    subTitleKey: "Video details",
    screenType: StepType.VideoDetails,
  },
  {
    Id: 2,
    subTitleKey: "Images",
    screenType: StepType.Images,
  },
  {
    Id: 3,
    subTitleKey: "Creators",
    screenType: StepType.Creators,
  },
  {
    Id: 4,
    subTitleKey: "Payments",
    screenType: StepType.Payments,
  },
  {
    Id: 5,
    subTitleKey: "Intro",
    screenType: StepType.Intro,
  },
  {
    Id: 6,
    subTitleKey: "Summary",
    screenType: StepType.Summary,
  },
];

export const MOVIE_NIGHT_STEPS_MODEL: StepsModel = [
  {
    Id: 0,
    subTitleKey: "Start creating",
    screenType: StepType.EmptyStep,
  },
  {
    Id: 1,
    subTitleKey: "Video details",
    screenType: StepType.VideoDetails,
  },
  {
    Id: 2,
    subTitleKey: "Images",
    screenType: StepType.Images,
  },
  {
    Id: 3,
    subTitleKey: "Creators",
    screenType: StepType.Creators,
  },
  {
    Id: 4,
    subTitleKey: "Payments",
    screenType: StepType.Payments,
  },
  {
    Id: 5,
    subTitleKey: "Intro",
    screenType: StepType.Intro,
  },
  {
    Id: 6,
    subTitleKey: "Summary",
    screenType: StepType.Summary,
  },
];
