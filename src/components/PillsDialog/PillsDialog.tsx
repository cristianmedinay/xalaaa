/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React, { useCallback, useState } from "react";

import "./PillsDialog.scss";

import { Pill, PillType } from "../Pill";
import { MediaButton } from "../MediaButton";

import { MediaButtonVariant } from "enums";

export type AddPillCallback = (value: string) => void;

export interface IPillsListProps {
  header: string;
  pillsList: PillType[];
  onDialogSubmit?: (selectedItems: PillType[]) => void;
}

export const PillsDialog = ({
  header,
  pillsList,
  onDialogSubmit = () => null,
}: IPillsListProps) => {
  const [selectedPills, setSelectedPills] = useState<PillType[]>([]);

  const handlePillClick = useCallback(({ id, title }: PillType) => {
    setSelectedPills((prev) =>
      prev.find((val) => id === val.id)
        ? prev.filter((val) => id !== val.id)
        : [...prev, { id, title }]
    );
  }, []);

  const handleAddClick = () => {
    onDialogSubmit(selectedPills);
  };

  return (
    <>
      <h1>{header}</h1>
      <div className="pills-container">
        {pillsList.map(({ id, title }) => (
          <Pill
            key={`${id}-${title}`}
            onClick={() => handlePillClick({ id, title })}
            title={title}
            isActive={selectedPills.some((val) => val.id === id)}
          />
        ))}
      </div>
      <MediaButton
        onClick={handleAddClick}
        variant={MediaButtonVariant.Transparent}
      >
        Add
      </MediaButton>
    </>
  );
};
