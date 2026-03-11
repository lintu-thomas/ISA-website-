import { useState, useMemo, useEffect } from "react";
import API_URL from "../utils/api";

export default function Calendar() {
    const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];
    
    const today = useMemo(() => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    }, []);

    const currentMonthName = today.toLocaleString("default", { month: "long" });
    const currentYear = today.getFullYear();

    const [month, setMonth] = useState(currentMonthName);
    const [year, setYear] = useState(currentYear);
    
    // API Events State
    const [apiEvents, setApiEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const monthIndex = months.indexOf(month);
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const startDay = new Date(year, monthIndex, 1).getDay();

    const weekdayLabels = ["S", "M", "T", "W", "T", "F", "S"];

    // Fetch live events from unified backend
    useEffect(() => {
        const fetchEvents = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${API_URL}/events`);
                if (response.ok) {
                    const data = await response.json();
                    setApiEvents(data);
                }
            } catch (error) {
                console.error("Failed to fetch events from admin backend:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, []);

    // Filter and group events for the currently selected month and year
    const eventsThisMonth = useMemo(() => {
        const eventMap = {};
        
        apiEvents.forEach(evt => {
            const eventDate = new Date(evt.date);
            if (eventDate.getFullYear() === year && eventDate.getMonth() === monthIndex) {
                const day = eventDate.getDate();
                if (!eventMap[day]) eventMap[day] = [];
                eventMap[day].push(evt.title);
            }
        });
        
        return eventMap;
    }, [apiEvents, year, monthIndex]);

    const prevMonthAllowed = (() => {
        let prevMonthIdx = monthIndex - 1;
        let prevYear = year;
        if (prevMonthIdx < 0) {
            prevMonthIdx = 11;
            prevYear = year - 1;
        }
        const endOfPrev = new Date(prevYear, prevMonthIdx + 1, 0);
        endOfPrev.setHours(0, 0, 0, 0);
        return endOfPrev >= today;
    })();

    const goPrevMonth = () => {
        if (!prevMonthAllowed) return;
        let idx = monthIndex - 1;
        let newYear = year;
        if (idx < 0) {
            idx = 11;
            newYear = year - 1;
        }
        setMonth(months[idx]);
        setYear(newYear);
    };

    const goNextMonth = () => {
        let idx = monthIndex + 1;
        let newYear = year;
        if (idx > 11) {
            idx = 0;
            newYear = year + 1;
        }
        setMonth(months[idx]);
        setYear(newYear);
    };

    return (
        <div style={styles.container}>
            <div style={styles.headerRow}>
                <div>
                    <div style={styles.monthTitle}>{month} <span style={styles.yearText}>{year}</span></div>
                    <div style={styles.subTitle}>
                        {isLoading ? "Syncing with Admin..." : "Live University Calendar"}
                    </div>
                </div>

                <div style={styles.controls}>
                    <button onClick={goPrevMonth} disabled={!prevMonthAllowed} style={prevMonthAllowed ? styles.navButton : styles.navButtonDisabled}>❮</button>
                    <select value={month} onChange={(e) => setMonth(e.target.value)} style={styles.select}>
                        {months.map((m) => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                    <button onClick={goNextMonth} style={styles.navButton}>❯</button>

                    <label style={styles.yearLabel}>
                        Year
                        <input
                            type="number"
                            min={currentYear}
                            value={year}
                            onChange={(e) => {
                                const v = Number(e.target.value) || currentYear;
                                setYear(Math.max(v, currentYear));
                            }}
                            style={styles.yearInput}
                        />
                    </label>
                </div>
            </div>

            <div style={styles.weekdayRow}>
                {weekdayLabels.map((d, i) => (
                    <div key={`wd-${i}`} style={styles.weekdayCell}>{d}</div>
                ))}
            </div>

            <div style={styles.grid}>
                {/* leading blanks for the first week */}
                {[...Array(startDay)].map((_, i) => (
                    <div key={`pad-${i}`} style={styles.emptyCell} />
                ))}

                {/* days of month; hide any day that is before today's date */}
                {Array.from({ length: daysInMonth }, (_, i) => {
                    const day = i + 1;
                    const cellDate = new Date(year, monthIndex, day);
                    cellDate.setHours(0, 0, 0, 0);

                    const isPast = cellDate < today;
                    const dayEvents = eventsThisMonth[day];

                    return (
                        <div key={day} style={isPast ? styles.dayCellPast : styles.dayCell}>
                            {!isPast ? (
                                <>
                                    <div style={styles.dayNumber}>{day}</div>
                                    {dayEvents && dayEvents.map((title, idx) => (
                                        <div key={idx} style={styles.eventBadge} title={title}>
                                            {title.length > 20 ? title.substring(0, 18) + '...' : title}
                                        </div>
                                    ))}
                                </>
                            ) : null}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

const styles = {
    container: { width: "100%", maxWidth: "100%", margin: 0, padding: 12, background: "#ffffff", borderRadius: 10, boxShadow: "0 6px 18px rgba(20,20,40,0.06)", fontFamily: 'Inter, "Times New Roman", system-ui', fontSize: 14 },
    headerRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
    monthTitle: { fontSize: 18, fontWeight: 700, color: "#1A2A6C", fontFamily: "Georgia" },
    yearText: { fontWeight: 500, color: "#555" },
    subTitle: { fontSize: 12, color: "#8A7A8D", fontStyle: "italic" },
    controls: { display: "flex", gap: 8, alignItems: "center" },
    select: { padding: "6px 8px", borderRadius: 8, border: "1px solid #E0E0FF", background: "#fff", fontSize: 13, color: "#1A2A6C" },
    navButton: { padding: "6px 8px", borderRadius: 8, border: "none", background: "#1A2A6C", color: "#fff", cursor: "pointer", fontSize: 14 },
    navButtonDisabled: { padding: "6px 8px", borderRadius: 8, border: "none", background: "#E0E0FF", color: "#8A7A8D", cursor: "not-allowed" },
    yearLabel: { display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#555" },
    yearInput: { width: 72, padding: "6px 8px", borderRadius: 8, border: "1px solid #E0E0FF", fontSize: 13, color: "#1A2A6C" },
    weekdayRow: { display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 6, marginTop: 6 },
    weekdayCell: { textAlign: "center", fontWeight: 700, color: "#1A2A6C", padding: 6, fontSize: 13, borderBottom: "1px solid #E0E0FF" },
    grid: { display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 6, marginTop: 8 },
    dayCell: { minHeight: 72, borderRadius: 8, background: "#fff", border: "1px solid #F9F9FF", padding: 8, display: "flex", flexDirection: "column", justifyContent: "flex-start", transition: "transform .12s ease", boxShadow: "0 2px 6px rgba(0,0,0,0.04)" },
    dayCellPast: { minHeight: 72, borderRadius: 8, background: "#F9F9FF", border: "1px dashed #E0E0FF", padding: 8 },
    dayNumber: { fontWeight: 700, color: "#555", fontSize: 13, marginBottom: 4 },
    eventBadge: { background: "#413543", color: "#F0E9D2", padding: "4px 6px", borderRadius: 6, fontSize: 10, marginTop: 4, boxShadow: "0 2px 4px rgba(0,0,0,0.1)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
    emptyCell: { minHeight: 72 },
};