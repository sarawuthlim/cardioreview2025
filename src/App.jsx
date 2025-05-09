import React, { useState, useMemo } from "react";
import "./App.css";
import "./index.css";

// --- 1. Data Structure ---
// Sample conference data. You can replace this with your actual agenda.
const conferenceSchedule = [
  // Day 1: July 5, 2025
  {
    id: 1,
    date: "2025-07-05",
    room: "ห้องประชุมใหญ่",
    title: "ปาฐกถา ปชุม ทาสุคนธ์: Digitalization in Cardiovascular Care",
    speakers: ["TBA"],
    startTime: "08:50",
    endTime: "09:30",
  },
  {
    id: 2,
    date: "2025-07-05",
    room: "ห้องประชุมใหญ่",
    title: "Obesity and Metabolic Disorder, Staging and Management",
    speakers: ["นพ.นครินทร์ ศันสนยุทธ"],
    startTime: "09:30",
    endTime: "10:00",
  },
  {
    id: 3,
    date: "2025-07-05",
    room: "",
    title: "Break & Exhibition",
    speakers: [],
    startTime: "10:00",
    endTime: "10:30",
  },
  {
    id: 4,
    date: "2025-07-05",
    room: "ห้องประชุมใหญ่",
    title:
      "From VTE to Acute Pulmonary Embolism and the Clinical Continuum and Extended Treatment",
    speakers: ["พญ.วราภรณ์ ติยานนท์"],
    startTime: "10:30",
    endTime: "11:00",
  },
  {
    id: 5,
    date: "2025-07-05",
    room: "ห้องพิธีการ (ดุสิตธานี)",
    title: "Chest Pain Evaluation and State of the Art in CCS Management",
    speakers: ["นพ.ธิปกร ผังเมืองดี"],
    startTime: "10:30",
    endTime: "11:00",
  },
  {
    id: 6,
    date: "2025-07-05",
    room: "ห้องประชุมใหญ่",
    title: "Treat Atrial Fibrillation to Improve your Patient Outcomes",
    speakers: ["นพ.ธรณิศ จันทรารัตน์"],
    startTime: "11:00",
    endTime: "11:30",
    description: "A critical discussion on data privacy in the digital age.",
  },
  {
    id: 7,
    date: "2025-07-05",
    room: "ห้องพิธีการ (ดุสิตธานี)",
    title:
      "Integrated Care in Structural Heart Disease (TAVR / ASD / VSD Closure or M-TEER)",
    speakers: ["นพ.นครินทร์ ศันสนยุทธ", "นพ.ปัณณธร ตั้งกงพานิช"],
    startTime: "11:00",
    endTime: "11:30",
  },
  {
    id: 8,
    date: "2025-07-05",
    room: "ห้องประชุมใหญ่",
    title: "2025 GLP-1 RA: Updates In Cardiology",
    speakers: ["TBA"],
    startTime: "11:30",
    endTime: "12:10",
    description: "Luncheon symposium sponsored by Novo Nordisk Pharma.",
  },
  {
    id: 9,
    date: "2025-07-05",
    room: "ห้องพิธีการ (ดุสิตธานี)",
    title: "Beyond LDL-C Lowering: Add on to Enhance Cardiovascular Outcome",
    speakers: ["TBA"],
    startTime: "11:30",
    endTime: "12:10",
    description: "Luncheon symposium sponsored by Daiichi Sankyo.",
  },
  {
    id: 10,
    date: "2025-07-05",
    room: "ห้องประชุมใหญ่",
    title:
      "Renal Risk and Acute AEs with Iodinated Contrast: Evidence-Based Practices and Guidelines",
    speakers: ["TBA"],
    startTime: "12:10",
    endTime: "12:50",
    description: "Luncheon symposium sponsored by Bayer.",
  },
  {
    id: 11,
    date: "2025-07-05",
    room: "ห้องพิธีการ (ดุสิตธานี)",
    title:
      "CARE for Every Beat: Optimizing NOAC Selection in Challenging AF Patients",
    speakers: ["TBA"],
    startTime: "12:10",
    endTime: "12:50",
    description: "Luncheon symposium sponsored by Daiichi Sankyo.",
  },

  {
    id: 12,
    date: "2025-07-05",
    room: "",
    title: "Break & Exhibition",
    speakers: [],
    startTime: "12:50",
    endTime: "13:00",
  },
  {
    id: 13,
    date: "2025-07-05",
    room: "ห้องประชุมใหญ่",
    title: "Stress-Induced Cardiomyopathy...the Common Stress to Address",
    speakers: ["นพ.จิงโจ้ สายสอาด"],
    startTime: "13:00",
    endTime: "13:30",
  },
  {
    id: 14,
    date: "2025-07-05",
    room: "ห้องพิธีการ (ดุสิตธานี)",
    title: "Hypertension Management: From ESC to Thai Guidelines",
    speakers: ["นพ.นพกฤษฏิ์ จิระวรกาญจน์"],
    startTime: "13:00",
    endTime: "13:30",
  },
  {
    id: 15,
    date: "2025-07-05",
    room: "ห้องประชุมใหญ่",
    title: "Comprehensive Care for Adult Congenital Heart Disease",
    speakers: ["พญ.วีรพร ปิ่นพานิชการ"],
    startTime: "13:30",
    endTime: "14:00",
  },
  {
    id: 16,
    date: "2025-07-05",
    room: "ห้องพิธีการ (ดุสิตธานี)",
    title: "Tricuspid Regurgitation and RV Failure - the Vice Versa",
    speakers: ["พญ.วราภรณ์ ติยานนท์"],
    startTime: "13:30",
    endTime: "14:00",
  },
  {
    id: 17,
    date: "2025-07-05",
    room: "ห้องประชุมใหญ่",
    title: "Practical Points in Effective and Sustained Lipid Management",
    speakers: ["TBA"],
    startTime: "14:00",
    endTime: "14:30",
    description: "Plenary session sponsored by Novartis.",
  },
  {
    id: 18,
    date: "2025-07-05",
    room: "ห้องพิธีการ (ดุสิตธานี)",
    title:
      "Shielding the Heart: The Critical Role of Shingles Vaccination in Cardiovascular Patients",
    speakers: ["TBA"],
    startTime: "14:00",
    endTime: "14:30",
    description: "Plenary session sponsored by GSK.",
  },
  {
    id: 19,
    date: "2025-07-05",
    room: "",
    title: "Break & Exhibition",
    speakers: [],
    startTime: "14:30",
    endTime: "15:00",
  },
  {
    id: 20,
    date: "2025-07-05",
    room: "ห้องประชุมใหญ่",
    title:
      "Cardiovascular Disease Patients and Pregnancy: The Cutting Edge in Management ",
    speakers: ["พญ.วีรพร ปิ่นพานิชการ"],
    startTime: "15:00",
    endTime: "15:30",
  },
  {
    id: 21,
    date: "2025-07-05",
    room: "ห้องพิธีการ (ดุสิตธานี)",
    title: "Sports Cardiology: Is it OK to Participate in Sports",
    speakers: ["Sophia Davis", "Raj Patel"],
    startTime: "15:00",
    endTime: "15:30",
  },
  {
    id: 22,
    date: "2025-07-05",
    room: "ห้องประชุมใหญ่",
    title: "Clinical Complex Case I",
    speakers: [
      "พญ.วราภรณ์ ติยานนท์",
      "นพ.ธรณิศ จันทรารัตน์",
      "นพ.จิงโจ้ สายสอาด",
      "นพ.ศราวุธ ลิ้มประเสริฐ",
    ],
    startTime: "15:30",
    endTime: "16:00",
  },
  {
    id: 23,
    date: "2025-07-06",
    room: "ห้องประชุมใหญ่",
    title: "Syncope: Is PILL or PACE for your patients?",
    speakers: ["นพ.ธรณิศ จันทรารัตน์", "นพ.ศราวุธ ลิ้มประเสริฐ"],
    startTime: "09:00",
    endTime: "09:30",
  },
  {
    id: 24,
    date: "2025-07-06",
    room: "ห้องพิธีการ (ดุสิตธานี)",
    title: "2025 Update: Cardiovascular Assessment Before Non-Cardiac Surgery",
    speakers: ["Sพญ.หัสยา ประสิทธิ์ดํารง"],
    startTime: "09:00",
    endTime: "09:30",
  },
  {
    id: 25,
    date: "2025-07-06",
    room: "ห้องประชุมใหญ่",
    title: "Current STEMI Management and STEMI: ECG You can't miss!!",
    speakers: ["พญ.ธัญรัตน์ อร่ามเสรีวงศ์"],
    startTime: "09:30",
    endTime: "10:00",
  },
  {
    id: 26,
    date: "2025-07-06",
    room: "ห้องพิธีการ (ดุสิตธานี)",
    title: "How to Approach Wide Complex Tachycardia and Electrical Storm?",
    speakers: ["นพ.ปรีชา เอื้อโรจนอังกูร"],
    startTime: "09:30",
    endTime: "10:00",
  },
  {
    id: 27,
    date: "2025-07-06",
    room: "",
    title: "Break & Exhibition",
    speakers: [],
    startTime: "10:00",
    endTime: "10:30",
  },
  {
    id: 28,
    date: "2025-07-06",
    room: "ห้องประชุมใหญ่",
    title: "Transition Care from Acute to Chronic Heart Failure",
    speakers: ["นพ.จิงโจ้ สายสอาด"],
    startTime: "10:30",
    endTime: "11:00",
  },
  {
    id: 29,
    date: "2025-07-06",
    room: "ห้องพิธีการ (ดุสิตธานี)",
    title: "Empowering Clinical Decisions Through Cardiac Imaging",
    speakers: ["พญ.หัสยา ประสิทธิ์ดํารง", "นพ.ปิยนันท์ สงวนวงษ์"],
    startTime: "10:30",
    endTime: "11:00",
  },
  {
    id: 30,
    date: "2025-07-06",
    room: "ห้องประชุมใหญ่",
    title: "Brugada Syndrome or Brugada ECG or I just see Phenocopy",
    speakers: ["นพ.ปรีชา เอื้อโรจนอังกูร"],
    startTime: "11:00",
    endTime: "11:30",
  },
  {
    id: 31,
    date: "2025-07-06",
    room: "ห้องพิธีการ (ดุสิตธานี)",
    title: "Cardio-Oncology: The Emerging Perspectives",
    speakers: ["นพ.ปัณณธร ตั้งกงพานิช"],
    startTime: "11:00",
    endTime: "11:30",
  },
  {
    id: 32,
    date: "2025-07-06",
    room: "ห้องประชุมใหญ่",
    title:
      "From Guidelines to Real Practice in Cardio-Renal-Metabolic Treatment",
    speakers: ["TBA"],
    startTime: "11:30",
    endTime: "12:10",
    description: "Luncheon symposium sponsored by Boehringer Ingelheim.",
  },
  {
    id: 33,
    date: "2025-07-06",
    room: "ห้องพิธีการ (ดุสิตธานี)",
    title: "Optimizing AF/SVT Management: An Evidence-Based Approach",
    speakers: ["TBA"],
    startTime: "11:30",
    endTime: "12:10",
    description: "Luncheon symposium sponsored by Abbott Laboratories.",
  },
  {
    id: 34,
    date: "2025-07-06",
    room: "ห้องประชุมใหญ่",
    title:
      "High Purify EPA in ASCVD Risk Reduction, The Evidence You can't Imagine",
    speakers: ["TBA"],
    startTime: "12:10",
    endTime: "12:50",
    description: "Luncheon symposium sponsored by Thai Meiji Pharma.",
  },
  {
    id: 35,
    date: "2025-07-06",
    room: "ห้องพิธีการ (ดุสิตธานี)",
    title:
      "Across the Continuum: SGLT2i in Cardiovascular Protection and Beyond (New Update: DAPA-TAVI Study)",
    speakers: ["TBA"],
    startTime: "12:10",
    endTime: "12:50",
    description: "Luncheon symposium sponsored by Astra Zeneca.",
  },
  {
    id: 36,
    date: "2025-07-06",
    room: "",
    title: "Break & Exhibition",
    speakers: [],
    startTime: "12:50",
    endTime: "13:00",
  },
  {
    id: 37,
    date: "2025-07-06",
    room: "ห้องประชุมใหญ่",
    title: "ACS 2025: What is Changed from ACC Guidelines?",
    speakers: ["นพ.ธิปกร ผังเมืองดี"],
    startTime: "13:00",
    endTime: "13:30",
  },
  {
    id: 38,
    date: "2025-07-06",
    room: "ห้องพิธีการ (ดุสิตธานี)",
    title: "Clinical Complex Case II",
    speakers: [
      "นพ.ปรีชา เอื้อโรจนอังกูร",
      "นพ.นครินทร์ ศันสนยุทธ",
      "นพ.ปัณณธร ตั้งกงพานิช",
      "นพ.นพกฤษฏิ์ จิระวรกาญจน์",
    ],
    startTime: "13:00",
    endTime: "13:30",
  },
  {
    id: 39,
    date: "2025-07-06",
    room: "ห้องประชุมใหญ่",
    title:
      "Rewriting the Lipid Timeline: Role of Early PCSK9 inhibitor for Long-Term CV Risk Reduction",
    speakers: ["TBA"],
    startTime: "13:30",
    endTime: "14:00",
    description: "Plenary session sponsored by Amgen.",
  },
  {
    id: 40,
    date: "2025-07-06",
    room: "ห้องพิธีการ (ดุสิตธานี)",
    title:
      "Third Generation CCBs: The Strategic Integration for Hypertension Management",
    speakers: ["TBA"],
    startTime: "13:30",
    endTime: "14:00",
    description: "Plenary session sponsored by DKSH.",
  },
  {
    id: 41,
    date: "2025-07-06",
    room: "ห้องประชุมใหญ่",
    title: "Multi-Vessels Disease and LV Dysfunction",
    speakers: ["พญ.ธัญรัตน์ อร่ามเสรีวงศ์", "พญ.หัสยา ประสิทธิ์ดํารง"],
    startTime: "14:00",
    endTime: "14:30",
  },
  {
    id: 42,
    date: "2025-07-06",
    room: "ห้องพิธีการ (ดุสิตธานี)",
    title: "Endocarditis is NOT Simple as you Think",
    speakers: ["พญ.วีรพร ปิ่นพานิชการ", "นพ.ธิปกร ผังเมืองดี"],
    startTime: "14:00",
    endTime: "14:30",
  },
  {
    id: 43,
    date: "2025-07-06",
    room: "",
    title: "Break & Exhibition",
    speakers: [],
    startTime: "14:30",
    endTime: "15:00",
  },
  {
    id: 44,
    date: "2025-07-06",
    room: "ห้องประชุมใหญ่",
    title: "The Trials That May Change my Practice",
    speakers: ["All Staffs"],
    startTime: "15:00",
    endTime: "15:30",
  },
  {
    id: 45,
    date: "2025-07-06",
    room: "ห้องประชุมใหญ่",
    title: "Interesting guest talk",
    speakers: ["นพ.นิมิตร์ ศิริธนากิจ (เจ้าของเพจหมอหมีเม้าท์มอย)"],
    startTime: "15:30",
    endTime: "16:00",
  },
];

// --- 2. Session Card Component ---
// This component displays a single session.
// It takes a 'session' object as a prop.
const SessionCard = ({ session }) => {
  // Helper to format date for display
  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString + "T00:00:00").toLocaleDateString(
      undefined,
      options
    );
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 hover:shadow-xl transition-shadow duration-300">
      {/* if session.title equal "Break & Exhibition" classNam will be text-gray-500, else text-indigo-700 */}
      <h3
        className={`text-xl font-semibold mb-2 ${
          session.title === "Break & Exhibition"
            ? "text-gray-400"
            : "text-indigo-700"
        }`}
      >
        {session.title}
      </h3>
      {session.speakers && session.speakers.length > 0 && (
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-medium">Speaker(s):</span>{" "}
          {session.speakers.join(", ")}
        </p>
      )}
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium">Time:</span> {session.startTime} -{" "}
        {session.endTime}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium">Date:</span> {formatDate(session.date)}
      </p>
      {/* if session.room is not empty, show the room */}
      {session.room && (
        <p className="text-sm text-gray-600 mb-3">
          <span className="font-medium">Room:</span>
          <span
            className={`ml-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
              session.room === "ห้องประชุมใหญ่"
                ? "bg-blue-100 text-blue-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {session.room}
          </span>
        </p>
      )}
      {session.description && (
        <p className="text-gray-700 text-sm">{session.description}</p>
      )}
    </div>
  );
};

// --- 3. Filter Controls Component ---
// This component provides dropdowns for date and room selection.
// It takes 'availableDates', 'availableRooms', 'selectedDate', 'setSelectedDate',
// 'selectedRoom', and 'setSelectedRoom' as props.
const FilterControls = ({
  availableDates,
  availableRooms,
  selectedDate,
  setSelectedDate,
  selectedRoom,
  setSelectedRoom,
}) => {
  return (
    <div className="mb-8 p-6 bg-gray-100 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label
            htmlFor="date-filter"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Filter by Date:
          </label>
          <select
            id="date-filter"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">All Dates</option>
            {availableDates.map((date) => (
              <option key={date} value={date}>
                {new Date(date + "T00:00:00").toLocaleDateString(undefined, {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="room-filter"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Filter by Room:
          </label>
          <select
            id="room-filter"
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">All Rooms</option>
            {availableRooms.map(
              (room) =>
                // only room is not empty
                room && (
                  <option key={room} value={room}>
                    {room}
                  </option>
                )
            )}
          </select>
        </div>
        <button
          onClick={() => {
            setSelectedDate("");
            setSelectedRoom("");
          }}
          className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm transition duration-150 ease-in-out"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

// --- 4. Agenda Display Component ---
// This component filters and displays the sessions.
// It takes 'sessions', 'selectedDate', and 'selectedRoom' as props.
const AgendaDisplay = ({ sessions, selectedDate, selectedRoom }) => {
  const filteredSessions = useMemo(() => {
    return sessions
      .filter((session) => {
        const dateMatch = !selectedDate || session.date === selectedDate;
        const roomMatch = !selectedRoom || session.room === selectedRoom;
        return dateMatch && roomMatch;
      })
      .sort((a, b) => {
        // Sort by date, then start time, then room
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        if (a.startTime < b.startTime) return -1;
        if (a.startTime > b.startTime) return 1;
        if (a.room < b.room) return -1;
        if (a.room > b.room) return 1;
        return 0;
      });
  }, [sessions, selectedDate, selectedRoom]);

  if (filteredSessions.length === 0) {
    return (
      <p className="text-center text-gray-500 text-lg">
        No sessions match your current filters.
      </p>
    );
  }

  return (
    <div>
      {filteredSessions.map((session) => (
        <SessionCard key={session.id} session={session} />
      ))}
    </div>
  );
};

// --- 5. Main App Component ---
// This is the top-level component.
// It manages the state for filters and renders other components.
function App() {
  const [selectedDate, setSelectedDate] = useState(""); // e.g., '2025-07-05'
  const [selectedRoom, setSelectedRoom] = useState(""); // e.g., 'A'

  // Get unique dates and rooms from the schedule for filter options
  const availableDates = useMemo(() => {
    const dates = new Set(conferenceSchedule.map((session) => session.date));
    return Array.from(dates).sort();
  }, []);

  const availableRooms = useMemo(() => {
    const rooms = new Set(conferenceSchedule.map((session) => session.room));
    return Array.from(rooms).sort();
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-8 font-sans bg-gray-50 min-h-screen">
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-800">
          PMK Cardiology Review 2025
        </h1>
        <p className="text-lg text-gray-600 mt-2">July 5-6, 2025</p>
      </header>

      <FilterControls
        availableDates={availableDates}
        availableRooms={availableRooms}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
      />

      <main>
        <AgendaDisplay
          sessions={conferenceSchedule}
          selectedDate={selectedDate}
          selectedRoom={selectedRoom}
        />
      </main>

      <footer className="text-center mt-12 py-6 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Your Conference Name. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
