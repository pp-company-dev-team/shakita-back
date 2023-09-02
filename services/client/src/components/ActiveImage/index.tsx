"use client";
import { ReactElement, useEffect, useState } from "react";

const MyComponent = (): ReactElement => {
  const [tablesActive, setTablesActive] = useState<string[]>([]);
  const [tablesChoosed, setTablesChoosed] = useState<string>("");
  const [tables, setTables] = useState<string[]>([
    "test1",
    "test2",
    "test3",
    "test4",
    "test5",
    "test6",
  ]);

  const [newTable, setNewTable] = useState<string[]>([]);
  const add = (x: string, y: string) => {
    setNewTable([
      ...newTable,
      `<circle cx="${x}" cy="${y}" r="13.5" fill="#D9D9D9" id="test${
        tables.length + 1
      }" class="test${tables.length + 1}" />`,
    ]);
    setTables([...tables, `test${tables.length + 1}`]);
    console.log(tables);
  };
  const myClick = (id_table: string) => {
    console.log("listeners");
    const handler = () => {
      console.log("Click", id_table);
      if (
        !tablesActive.find((table) => table === id_table) ||
        tablesActive.length === 0
      ) {
        setTablesChoosed(id_table);
      } else {
        console.log("Removed", id_table);
        document
          .getElementById(id_table)
          ?.removeEventListener("click", handler);
        console.log("Blocked");
      }
    };
    return handler;
  };
  const addListeners = () => {
    console.log("add;isteners", tablesActive);
    console.log("tables", tables);
    tables.forEach((id_table) => {
      document
        .getElementById(id_table)
        ?.addEventListener("click", myClick(id_table));
    });
  };

  const htmlString = `<svg id="testsvg" class="drawing" width="650" height="650" viewBox="0 0 821 822" fill="black" xmlns="http://www.w3.org/2000/svg" > <path d="M2 820V2H53.1132V80.7163H724.076V2H769.509V454.01H819V496.208H604V820H562.623V779.425V496.208H527.736V463.748H724.076V123.726H452.283V296.577H321.66V123.726H139.925H44.1887V463.748H208.887V496.208H44.1887V779.425H483.113V820H2Z" stroke="#D9D9D9" stroke-width="3" /> <path d="M452.283 355.006H410.094V463.748H296.509V496.208H465.264V463.748H452.283V355.006Z" stroke="#D9D9D9" stroke-width="3" /> <rect x="124" y="122" width="49" height="200" fill="#D9D9D9" /> <circle cx="275" cy="167" r="25" fill="#D9D9D9" id="test1" class="test1" /> <circle cx="167" cy="727" r="25" fill="#D9D9D9" id="test2" class="test2" /> <circle cx="378" cy="722" r="25" fill="#D9D9D9" id="test3" class="test3" /> <rect x="173" y="532" width="50" height="85" transform="rotate(90 173 532)" fill="#D9D9D9" id="test7" class="test7" /> <rect x="701" y="386" width="50" height="85" transform="rotate(90 701 386)" fill="#D9D9D9" id="test8" class="test8" /> <rect x="536" y="230" width="50" height="85" transform="rotate(-180 536 230)" fill="#D9D9D9" id="test9" class="test9" /> <rect x="701" y="272" width="50" height="85" transform="rotate(90 701 272)" fill="#D9D9D9" id="test10" class="test10" /> <rect x="701" y="152" width="50" height="85" transform="rotate(90 701 152)" fill="#D9D9D9" id="test11" class="test11" /> <circle cx="353" cy="407" r="25" fill="#D9D9D9" id="test4" class="test4" /> <circle cx="104" cy="407" r="25" fill="#D9D9D9" id="test5" class="test5" /> <circle cx="378.5" cy="547.5" r="15.5" fill="#D9D9D9" id=" test6"class="test6" /> <circle cx="389.5" cy="547.5" r="13.5" fill="#D9D9D9" id="test6"class="test6" />${newTable.join(
    " "
  )}</svg>`;
  useEffect(() => {
    // addListeners();
    const div = document.getElementById("testsvg");
    div!.addEventListener("click", function (event) {
      // var rect = div!.getBoundingClientRect();
      var x = event.clientX;
      var y = event.clientY;
      console.log(
        "Cursor coordinates relative to the div: (" + x + ", " + y + ")"
      );
    });

    //   "mouseup", (event) => {
    //   console.log("event.clientX", event.clientX);
    //   console.log("event.clientY", event.clientY);
    //   console.log("event.x", event.x);
    //   console.log("event.y", event.y);
    //   console.log("event.movementX", event.movementX);
    //   console.log("event.movementY", event.movementY);
    //   console.log("event.screenX", event.screenX);
    //   console.log("event.screenX", event.screenY);
    //   console.log("event.offsetX", event.offsetX);
    //   console.log("event.offsetY", event.offsetY);
    //   console.log("event.pageX", event.pageX);
    //   console.log("event.pageY", event.pageY);
    //   add(event.x.toString(), event.y.toString());
    // });
    // document.addEventListener("mouseenter", (event) => {
    //   console.log("event.clientX", event.clientX);
    //   console.log("event.clientY", event.clientY);
    //   console.log("event.x", event.x);
    //   console.log("event.y", event.y);
    //   console.log("event.movementX", event.movementX);
    //   console.log("event.movementY", event.movementY);
    //   console.log("event.screenX", event.screenX);
    //   console.log("event.screenX", event.screenY);
    //   console.log("event.offsetX", event.offsetX);
    //   console.log("event.offsetY", event.offsetY);
    //   console.log("event.pageX", event.pageX);
    //   console.log("event.pageY", event.pageY);
    // });
  }, [add, newTable, htmlString, tables]);
  return (
    // <div id="testdiv">
    //   <button onClick={() => add("300", "300")}>Add</button>
    <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>
    // </div>
  );
};

export default MyComponent;
// onMouseDown={(event) => {
//   const width = document.getElementById("testdiv")?.offsetWidth ?? 0;
//   const height = document.getElementById("testdiv")?.offsetHeight ?? 0;
//   add(event.clientX.toString(), event.clientY.toString());
//   console.log(event.clientX.toString(), event.clientY.toString());
//   console.log(window.innerWidth, window.innerHeight);
//   console.log(document.getElementById("testdiv")?.offsetWidth);
//   console.log(document.getElementById("testdiv")?.offsetHeight);
//   console.log(
//     "Correct x",
//     event.clientX - (window.innerWidth - width) / 2
//   );
//   console.log(
//     "Correct y",
//     event.clientY - (window.innerHeight - height)
//   );
// }}
