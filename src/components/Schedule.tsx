import React, { useState, useEffect } from "react";

const lessons = [
  "Lesson 1",
  "Lesson 2",
  "Lesson 3",
  "Lesson 4",
  "Lesson 5",
  "Lesson 6",
  "Lesson 7",
];
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu"];

const Schedule: React.FC = () => {
  const [indexOfLMV, setIndexOfLMV] = useState<number>(0);
  const [schedule, setSchedule] = useState<{
    [key: string]: { material: string; time: string };
  }>({});

  // Load schedule from localStorage on component mount
  useEffect(() => {
    const savedSchedule = localStorage.getItem("schoolSchedule");
    if (savedSchedule) {
      setSchedule(JSON.parse(savedSchedule));
    }
  }, []);

  // Handle data entry for material and time
  const handleChange = (
    day: string,
    lesson: string,
    field: "material" | "time",
    value: string
  ) => {
    setSchedule((prev) => ({
      ...prev,
      [`${day}-${lesson}`]: {
        ...prev[`${day}-${lesson}`],
        [field]: value,
      },
    }));
  };
  console.log(schedule);

  // Save to localStorage when the "Save" button is clicked
  const handleSave = () => {
    localStorage.setItem("schoolSchedule", JSON.stringify(schedule));
    alert("Schedule saved!");
  };

  const lessonsInMobileView = lessons.slice(indexOfLMV, indexOfLMV + 2);

  return (
    <div className="flex flex-col  items-center justify-center bg-gray-100 shadow-md px-2 py-5 rounded-2xl">
      <div className="relative  flex w-full">
        <h1 className="text-start  w-fit py-2 text-xl lg:text-2xl text-gray-800 font-bold mb-4 font-poppins -tracking-tighter">
          School Weekly Schedule
        </h1>

        <div className="absolute bottom-5 w-1/3 h-[2px] bg-gradient-to-l from-[rgba(188,165,255,0)] to-[#214d76]" />
        <div className="absolute bottom-5 w-1/3 h-[5px] bg-gradient-to-l from-[rgba(188,165,255,0)] to-[#214d76] blur-md" />
      </div>
      <div className=" relative flex pt-8 w-full  items-center justify-center ">
        {/* Save Button */}
        <button
          onClick={handleSave}
          className=" flex absolute -bottom-20 items-start justify-center pt-4
          text-xl text-gray-100  font-semibold  font-poppins  w-32 h-32 rounded-full bg-blue-500
          hover:bg-blue-600 hover:text-white transition-all duration-500
          "
        >
          Save
        </button>
      </div>
      <table className="shadow-xl z-10 ">
        {/* Mobile Mode */}
        <thead className="relative lg:hidden">
          <tr className="bg-gray-200 rounded-tl-3xl">
            <th className="relative bg-gray-400 rounded-tl-3xl">
              <div className="absolute h-[44px] w-[75px] border-2 border-gray-400 rounded-tl-3xl -top-[1px] -left-[1px]" />
            </th>
            {lessonsInMobileView.map((lesson) => (
              <th
                key={lesson}
                className="border-2 tracking-wider font-bold text-gray-700 font-poppins lg:text-lg border-gray-400 px-4 py-2"
              >
                {lesson}
              </th>
            ))}
          </tr>

          <button
            className={`${
              indexOfLMV !== 6
                ? "text-blue-600 hover:scale-110 transition-all duration-300"
                : "text-gray-400"
            } absolute font-semibold -top-9 font-poppins right-0`}
            onClick={() => setIndexOfLMV((prev) => prev + 2)}
            disabled={indexOfLMV === 6}
          >
            next
            <div
              className="absolute bottom-0 w-full h-[2px]
        bg-gradient-to-l from-[rgba(188,165,255,0)] to-[#214d76]  "
            />
          </button>

          <button
            className={`${
              indexOfLMV !== 0
                ? "text-blue-600 hover:scale-110 transition-all duration-300"
                : "text-gray-400"
            } absolute font-semibold -top-9 font-poppins left-0`}
            onClick={() => setIndexOfLMV((prev) => prev - 2)}
            disabled={indexOfLMV === 0}
          >
            prev
            <div
              className="absolute bottom-0 w-full h-[2px]
        bg-gradient-to-l from-[rgba(188,165,255,0)] to-[#214d76]  "
            />
          </button>
        </thead>

        {/* Desktop Mode */}
        <thead className="relative hidden lg:table-header-group">
          <tr className="bg-gray-200 rounded-tl-3xl">
            <th className="relative bg-gray-400 rounded-tl-3xl">
              <div className="absolute h-[76px] xl:h-[48px] w-[80px] border-2 border-gray-400 rounded-tl-3xl -top-[1px] -left-[1px]" />
            </th>
            {lessons.map((lesson) => (
              <th
                key={lesson}
                className="border-2 tracking-wider font-bold text-gray-700 font-poppins text-lg border-gray-400 px-4 py-2"
              >
                {lesson}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {weekdays.map((day, index) => (
            <tr
              key={day}
              className={
                index === weekdays.length - 1
                  ? "border-b-[3px] border-b-gray-400"
                  : ""
              }
            >
              <td className="border-2 bg-gray-200 tracking-wider font-bold text-gray-700 font-poppins lg:text-lg border-gray-400 px-4 py-2">
                {day}
              </td>

              {/* Mobile Mode */}
              {lessonsInMobileView.map((lesson, index) => (
                <td
                  key={lesson}
                  className={`border-2 border-t-0 lg:hidden bg-white border-gray-300 ${
                    index === 1 || lesson === "Lesson 7"
                      ? " border-r-2 border-r-gray-400"
                      : ""
                  }`}
                >
                  <input
                    type="text"
                    className="w-full font-semibold tracking-wider font-poppins 
                     px-2 pt-1 text-center outline-gray-400 hover:outline-double mb-1"
                    value={schedule[`${day}-${lesson}`]?.material || ""}
                    onChange={(e) =>
                      handleChange(day, lesson, "material", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    className="w-full font-semibold  font-poppins px-2 pb-1 text-center text-sm
                     outline-gray-400 hover:outline-double "
                    value={schedule[`${day}-${lesson}`]?.time || ""}
                    onChange={(e) =>
                      handleChange(day, lesson, "time", e.target.value)
                    }
                  />
                </td>
              ))}

              {/* Desktop Mode */}
              {lessons.map((lesson, index) => (
                <td
                  key={lesson}
                  className={`border-2  hidden lg:table-cell bg-white border-gray-300 ${
                    index === 6 ? " border-r-2 border-r-gray-400" : ""
                  }`}
                >
                  <input
                    type="text"
                    className="w-full font-semibold tracking-wider font-poppins 
                     px-2 pt-1 text-center outline-gray-400 hover:outline-double mb-1"
                    value={schedule[`${day}-${lesson}`]?.material || ""}
                    onChange={(e) =>
                      handleChange(day, lesson, "material", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    className="w-full font-semibold tracking-wider font-poppins px-2 pb-1 text-center
                     outline-gray-400 hover:outline-double "
                    value={schedule[`${day}-${lesson}`]?.time || ""}
                    onChange={(e) =>
                      handleChange(day, lesson, "time", e.target.value)
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Schedule;
