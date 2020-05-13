import React from "react";
import styled from "styled-components";
import EditableTable from "./EditableTable";

const Styles = styled.div`
  padding: 1rem;

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
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }

      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;

const emptyRow = { startTime: "", endTime: "", word: "" };

function NewLessonTable(props) {
  const { toggleNewLessonSource } = props.multiCardActions;
  const { isSourcePlaying, currentCard } = props.multiCardState;

  const { data, setData } = props;

  const columns = React.useMemo(
    () => [
      {
        Header: "Info",
        columns: [
          {
            Header: "Word",
            accessor: "word",
          },
          {
            Header: "Start Time(s)",
            accessor: "startTime",
          },
          {
            Header: "End Time(s)",
            accessor: "endTime",
          },
        ],
      },
      {
        Header: "Actions",
        columns: [
          {
            Header: "delete",
            Cell: (cellProps) => {
              const { row, deleteRow } = cellProps;
              return (
                <button onClick={() => deleteRow(row.index)} on>
                  remove
                </button>
              );
            },
          },
          {
            Header: "play",
            Cell: (cellProps) => {
              const { row } = cellProps;

              return (
                <button onClick={() => toggleNewLessonSource(row.index)} on>
                  {isSourcePlaying && cellProps.row.index === currentCard
                    ? "stop"
                    : "play"}
                </button>
              );
            },
          },
        ],
      },
    ],

    [isSourcePlaying]
  );

  //   const [data, setData] = React.useState(() => makeData(20))
  //   const [data, setData] = React.useState([emptyRow]);

  const [originalData] = React.useState(data);
  const [skipPageReset, setSkipPageReset] = React.useState(false);

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
  React.useEffect(() => {
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

  console.log(data);
  return (
    <Styles>
      <button onClick={resetData}>Clear table</button>
      <button onClick={() => setData([...data, emptyRow])}>Add row</button>

      <EditableTable
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
        deleteRow={deleteRow}
      />
    </Styles>
  );
}

export default NewLessonTable;
