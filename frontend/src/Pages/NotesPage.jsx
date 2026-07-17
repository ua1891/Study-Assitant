import { useState, useEffect } from "react";
import Header from "../Components/Header";
import styles from "../styles/NotesPage.module.css";

function NotesPage() {
    const [noteText, setNoteText] = useState("");
    const [savedNotes, setSavedNotes] = useState([]);

    const [summary, setSummary] = useState([]);
    const [isSummarizing, setIsSummarizing] = useState(false);

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [isAsking, setIsAsking] = useState(false);

    // Load saved notes from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("studyAssistantNotes");
        if (stored) {
            setSavedNotes(JSON.parse(stored));
        }
    }, []);

    // Persist saved notes to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("studyAssistantNotes", JSON.stringify(savedNotes));
    }, [savedNotes]);

    function handleSaveNote() {
        if (!noteText.trim()) return;
        setSavedNotes((prev) => [
            { id: Date.now(), text: noteText.trim() },
            ...prev,
        ]);
        setNoteText("");
        setSummary([]);
    }

    function handleDeleteNote(id) {
        setSavedNotes((prev) => prev.filter((note) => note.id !== id));
    }

    function handleSummarize() {
        if (!noteText.trim()) return;
        setIsSummarizing(true);
        setSummary([]);

        fetch("http://127.0.0.1:8000/notes/summarize", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: noteText }),
        })
            .then((res) => res.json())
            .then((data) => {
                setSummary(data.summary || []);
                setIsSummarizing(false);
            })
            .catch((err) => {
                console.error("Error summarizing note:", err);
                setIsSummarizing(false);
            });
    }

    function handleAskQuestion() {
        if (!question.trim()) return;
        setIsAsking(true);
        setAnswer("");

        const allNoteTexts = savedNotes.map((n) => n.text).join("\n\n");

        fetch("http://127.0.0.1:8000/notes/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question, context: allNoteTexts }),
        })
            .then((res) => res.json())
            .then((data) => {
                setAnswer(data.answer || "No answer found.");
                setIsAsking(false);
            })
            .catch((err) => {
                console.error("Error asking question:", err);
                setIsAsking(false);
            });
    }

    return (
        <div>
            <Header />

            <div className={styles.pageWrapper}>
                {/* ── Page Header ── */}
                <div className={styles.pageHeader}>
                    <h2 className={styles.pageTitle}>Notes — Study Assistant</h2>
                    <p className={styles.pageSubtitle}>
                        Paste your notes, then let the AI summarize or answer questions
                    </p>
                </div>

                {/* ── Two-Column Layout ── */}
                <div className={styles.layout}>

                    {/* ── Left: Your Note + AI Summary ── */}
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Your Note</h3>

                        <textarea
                            className={styles.noteTextarea}
                            placeholder="Paste or type your note here..."
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                        />

                        <div className={styles.noteActions}>
                            <button
                                className={styles.btnSummarize}
                                onClick={handleSummarize}
                                disabled={isSummarizing || !noteText.trim()}
                            >
                                {isSummarizing ? "Summarizing..." : "Summarize"}
                            </button>
                            <button
                                className={styles.btnSave}
                                onClick={handleSaveNote}
                                disabled={!noteText.trim()}
                            >
                                Save Note
                            </button>
                        </div>

                        {/* AI Summary Output */}
                        {(isSummarizing || summary.length > 0) && (
                            <div className={styles.summarySection}>
                                <h4 className={styles.summaryTitle}>AI Summary</h4>
                                {isSummarizing ? (
                                    <p className={styles.summaryLoading}>Generating summary...</p>
                                ) : (
                                    <ul className={styles.summaryList}>
                                        {summary.map((point, index) => (
                                            <li key={index}>{point}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>

                    {/* ── Right: Ask My Notes ── */}
                    <div className={styles.askCard}>
                        <h3 className={styles.askCardTitle}>
                            <span>🤖</span> Ask my notes
                        </h3>

                        <p className={styles.askLabel}>Q: Type your question about your saved notes</p>

                        <input
                            type="text"
                            className={styles.askInput}
                            placeholder="e.g. When does a BST become slow?"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAskQuestion()}
                        />

                        <button
                            className={styles.btnAsk}
                            onClick={handleAskQuestion}
                            disabled={isAsking || !question.trim() || savedNotes.length === 0}
                        >
                            {isAsking ? "Thinking..." : "Ask"}
                        </button>

                        {/* Answer Box */}
                        {answer && (
                            <div className={styles.answerBox}>
                                <strong>A:</strong> {answer}
                                <p className={styles.answerSource}>
                                    Answered from YOUR saved notes, locally
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Saved Notes List ── */}
                {savedNotes.length > 0 && (
                    <div className={styles.savedSection}>
                        <h3 className={styles.savedTitle}>Saved Notes</h3>
                        <ul className={styles.savedList}>
                            {savedNotes.map((note) => (
                                <li key={note.id} className={styles.savedItem}>
                                    <p className={styles.savedItemText}>{note.text}</p>
                                    <button
                                        className={styles.btnDeleteNote}
                                        onClick={() => handleDeleteNote(note.id)}
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default NotesPage;