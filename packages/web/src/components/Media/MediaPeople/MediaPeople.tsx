/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IMediaPersonModel, PersonInAssetType } from "@xala/common";
import React from "react";
import { Trans } from "react-i18next";

import { formatRole } from "helpers";

import "./MediaPeople.scss";

export interface MediaPeopleProps {
  people?: IMediaPersonModel[];
  loading?: boolean;
}

export const MediaPeople: React.FC<MediaPeopleProps> = ({
  people,
  loading,
}) => {
  const listOfPeople = people || [];

  const mediaDirector = formatRole(listOfPeople, PersonInAssetType.Director);
  const mediaWriter = formatRole(listOfPeople, PersonInAssetType.Writer);
  const mediaCast = formatRole(listOfPeople, PersonInAssetType.Cast);
  const mediaPresenter = formatRole(listOfPeople, PersonInAssetType.Presenter);
  const mediaEditor = formatRole(listOfPeople, PersonInAssetType.Editor);
  const mediaProducer = formatRole(listOfPeople, PersonInAssetType.Producer);

  if (!people && loading) {
    return (
      <>
        <div className="MediaPeople__skeleton" style={{ width: "12rem" }} />
        <div className="MediaPeople__skeleton" style={{ width: "9.5rem" }} />
        <div className="MediaPeople__skeleton" style={{ width: "14.5rem" }} />
      </>
    );
  }

  if (
    !mediaDirector &&
    !mediaWriter &&
    !mediaCast &&
    !mediaPresenter &&
    !mediaEditor &&
    !mediaProducer
  ) {
    return null;
  }

  return (
    <div className="MediaPeople">
      {mediaDirector && (
        <div className="MediaPeople__director">
          <Trans
            i18nKey="MEDIA__DIRECTOR"
            defaults="Director: {{directorsList}}"
            values={{ directorsList: mediaDirector }}
          />
        </div>
      )}
      {mediaWriter && (
        <div className="MediaPeople__writer">
          <Trans
            i18nKey="MEDIA__WRITER"
            defaults="Writer: {{writersList}}"
            values={{ writersList: mediaWriter }}
          />
        </div>
      )}
      {mediaCast && (
        <div className="MediaPeople__cast">
          <Trans
            i18nKey="MEDIA__CAST"
            defaults="Cast: {{castList}}"
            values={{ castList: mediaCast }}
          />
        </div>
      )}
      {mediaPresenter && (
        <div className="MediaPeople__presenter">
          <Trans
            i18nKey="MEDIA__PRESENTER"
            defaults="Presenter: {{presenterList}}"
            values={{ presenterList: mediaPresenter }}
          />
        </div>
      )}
      {mediaEditor && (
        <div className="MediaPeople__editor">
          <Trans
            i18nKey="MEDIA__EDITOR"
            defaults="Editor: {{editorList}}"
            values={{ editorList: mediaEditor }}
          />
        </div>
      )}
      {mediaProducer && (
        <div className="MediaPeople__producer">
          <Trans
            i18nKey="MEDIA__PRODUCER"
            defaults="Producer: {{producerList}}"
            values={{ producerList: mediaProducer }}
          />
        </div>
      )}
    </div>
  );
};
