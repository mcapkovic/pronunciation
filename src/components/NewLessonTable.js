import React, { useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditableTable from "./EditableTable";

const Styles = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.2rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }

      input {
        min-width: 1em;
        width: 100%;
        font-size: 1rem;
        padding: 0.2em;
        margin: 0;
        border: 0;
        :focus {
          outline: 2px dashed rgba(0, 0, 0, 0.2);
        }
      }

      button {
        width: 100%;
        :focus {
          outline: 2px dashed rgba(0, 0, 0, 0.2);
        }
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;

const ActionsToolbar = styled.div`
  display: flex;
`;

const RemoveControls = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  label {
    margin-left: 5px;
    margin-right: 15px;
  }
`;

const emptyRow = { startTime: "", endTime: "", word: "" };

function NewLessonTable(props) {
  const { toggleNewLessonSource, updatePosition } = props.multiCardActions;
  const { isSourcePlaying, currentCard } = props.multiCardState;

  const { data, setData } = props;
  const [isRemoveDisabled, setIsRemoveDisabled] = useState(true);

  const columns = useMemo(
    () => [
      {
        Header: "Word",
        accessor: "word",
      },
      {
        Header: "Start Time(s)",
        accessor: "startTime",
        inputType: "number",
        inputAttributes: {
          type: "number",
          step: 0.2,
        },
      },
      {
        Header: "play",
        Cell: (cellProps) => {
          const { row } = cellProps;

          return (
            <button
              onClick={() => toggleNewLessonSource(row.index)}
              on
            >
              {isSourcePlaying && cellProps.row.index === currentCard ? (
                <FontAwesomeIcon icon={faStop} />
              ) : (
                <FontAwesomeIcon icon={faPlay} />
              )}
            </button>
          );
        },
      },
      {
        Header: "End Time(s)",
        accessor: "endTime",
        inputAttributes: {
          type: "number",
          step: 0.2,
        },
      },

      {
        Header: "Remove",
        Cell: (cellProps) => {
          const { row, deleteRow } = cellProps;
          return (
            <button
              disabled={isRemoveDisabled}
              onClick={() => deleteRow(row.index)}
              on
            >
              x
            </button>
          );
        },
      },
    ],

    [isSourcePlaying, isRemoveDisabled]
  );

  const [originalData] = useState(data);
  const [skipPageReset, setSkipPageReset] = useState(false);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  // After data chagnes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  useEffect(() => {
    setSkipPageReset(false);
  }, [data]);

  // Let's add a data resetter/randomizer to help
  // illustrate that flow...
  const resetData = () => setData(originalData);

  const deleteRow = (rowIndex) => {
    const newData = [...data];

    // delete NewData[rowIndex];
    newData.splice(rowIndex, 1);

    setData(newData);
  };

  return (
    <Styles>
      <ActionsToolbar>
        <button onClick={() => setData([...data, emptyRow])}>Add row</button>
        <RemoveControls>
          <input
            id="enable-del"
            type="checkbox"
            onChange={(e) => setIsRemoveDisabled(!e.target.checked)}
            checked={!isRemoveDisabled}
          />
          <label htmlFor="enable-del">Danger zone</label>
          <button disabled={isRemoveDisabled} onClick={resetData}>
            Clear table
          </button>
        </RemoveControls>
      </ActionsToolbar>
      <EditableTable
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
        deleteRow={deleteRow}
        updateCardNumber={(cardIndex) => updatePosition(cardIndex)}
      />
    </Styles>
  );
}

export default NewLessonTable;
