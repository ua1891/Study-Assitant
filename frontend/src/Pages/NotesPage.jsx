import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FileText,
    Sparkles,
    MessageCircle,
    Trash2,
    Send,
    Save,
    CheckCircle2,
} from "lucide-react";
import Header from "../Components/Header";
import styles from "../styles/NotesPage.module.css";

const API_BASE = "http://127.0.0.1:8000";

function NotesPage() {
    // ── Draft note + AI summary ──
    const [noteText, setNoteText] = useState("");
    const [savedNotes, setSavedNotes] = useState([]); // [{ id, text, created_at }]
    const [isLoadingNotes, setIsLoadingNotes] = useState(true);

    const [summaryPoints, setSummaryPoints] = useState([]);
    const [summaryExplanation, setSummaryExplanation] = useState("");
    const [isSummarizing, setIsSummarizing] = useState(false);
    const [summarizeError, setSummarizeError] = useState("");

    // ── Ask my notes ──
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [usedNotes, setUsedNotes] = useState(false);
    const [isAsking, setIsAsking] = useState(false);
    const [askError, setAskError] = useState("");

    // ── Load saved notes from the real backend on mount ──
    useEffect(() => {
        fetchNotes();
    }, []);

    function fetchNotes() {
        setIsLoadingNotes(true);
        fetch(`${API_BASE}/notes/`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to load notes");
                return res.json();
            })
            .then((data) => {
                setSavedNotes(data || []);
                setIsLoadingNotes(false);
            })
            .catch((err) => {
                console.error("Error loading notes:", err);
                setIsLoadingNotes(false);
            });
    }

    // ── Save a note to the database ──
    function handleSaveNote() {
        if (!noteText.trim()) return;

        fetch(`${API_BASE}/notes/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: noteText.trim() }),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to save note");
                return res.json();
            })
            .then(() => {
                setNoteText("");
                setSummaryPoints([]);
                setSummaryExplanation("");
                fetchNotes(); // refresh the saved list from the DB
            })
            .catch((err) => {
                console.error("Error saving note:", err);
            });
    }

    // ── Delete a note from the database ──
    function handleDeleteNote(id) {
        fetch(`${API_BASE}/notes/${id}`, { method: "DELETE" })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to delete note");
                setSavedNotes((prev) => prev.filter((note) => note.id !== id));
            })
            .catch((err) => {
                console.error("Error deleting note:", err);
            });
    }

    // ── Summarize (Pydantic AI / Gemini via /agent/summarize) ──
    function handleSummarize() {
        if (!noteText.trim()) return;
        setIsSummarizing(true);
        setSummarizeError("");
        setSummaryPoints([]);
        setSummaryExplanation("");

        fetch(`${API_BASE}/agent/summarize`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: noteText }),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Summarize request failed");
                return res.json();
            })
            .then((data) => {
                setSummaryExplanation(data.explanation || "");
                setSummaryPoints(data.keypoints || []);
                setIsSummarizing(false);
            })
            .catch((err) => {
                console.error("Error summarizing note:", err);
                setSummarizeError("Couldn't summarize right now. Is the backend running?");
                setIsSummarizing(false);
            });
    }

    // ── Ask my notes (real tool-using agent via /agent/ask) ──
    function handleAskQuestion() {
        if (!question.trim()) return;
        setIsAsking(true);
        setAskError("");
        setAnswer("");
        setUsedNotes(false);

        fetch(`${API_BASE}/agent/ask`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question }),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Ask request failed");
                return res.json();
            })
            .then((data) => {
                setAnswer(data.answer || "No answer found.");
                setUsedNotes(Boolean(data.used_notes));
                setIsAsking(false);
            })
            .catch((err) => {
                console.error("Error asking question:", err);
                setAskError("Couldn't get an answer right now.");
                setIsAsking(false);
            });
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <Header />

            <div className={styles.pageWrapper}>
                <div className={styles.pageHeader}>
                    <h2 className={styles.pageTitle}>AI Notes</h2>
                    <p className={styles.pageSubtitle}>
                        Save your study materials, generate summaries, and ask questions
                        grounded in your own notes.
                    </p>
                </div>

                <div className={styles.layout}>
                    {/* ── Left: Draft Note + AI Summary ── */}
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>
                            <FileText size={18} />
                            Draft Note
                        </h3>

                        <textarea
                            className={styles.noteTextarea}
                            placeholder="Paste or type your study material here..."
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                        />

                        <div className={styles.noteActions}>
                            <button
                                className={styles.btnSummarize}
                                onClick={handleSummarize}
                                disabled={isSummarizing || !noteText.trim()}
                            >
                                <Sparkles size={16} />
                                {isSummarizing ? "Summarizing..." : "Summarize"}
                            </button>
                            <button
                                className={styles.btnSave}
                                onClick={handleSaveNote}
                                disabled={!noteText.trim()}
                            >
                                <Save size={16} />
                                Save Note
                            </button>
                        </div>

                        {summarizeError && (
                            <p style={{ color: "var(--rose)", fontSize: "0.85rem", marginTop: 10 }}>
                                {summarizeError}
                            </p>
                        )}

                        {(isSummarizing || summaryPoints.length > 0) && (
                            <motion.div
                                className={styles.summarySection}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                            >
                                <h4 className={styles.summaryTitle}>
                                    <Sparkles size={16} className={styles.sparkleIcon} />
                                    AI Summary
                                </h4>

                                {isSummarizing ? (
                                    <div className={styles.loadingSkeleton}>
                                        <div className="skeleton skeleton-text" />
                                        <div className="skeleton skeleton-text" />
                                        <div className="skeleton skeleton-text" style={{ width: "80%" }} />
                                    </div>
                                ) : (
                                    <>
                                        {summaryExplanation && (
                                            <p
                                                style={{
                                                    color: "var(--text-secondary)",
                                                    fontSize: "0.9rem",
                                                    lineHeight: 1.6,
                                                    marginBottom: 12,
                                                }}
                                            >
                                                {summaryExplanation}
                                            </p>
                                        )}
                                        <ul className={styles.summaryList}>
                                            {summaryPoints.map((point, index) => (
                                                <motion.li
                                                    key={index}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                >
                                                    {point}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </motion.div>
                        )}
                    </div>

                    {/* ── Right: Ask My Notes ── */}
                    <div className={styles.askCard}>
                        <h3 className={styles.askCardTitle}>
                            <MessageCircle size={18} />
                            Ask My Notes
                        </h3>

                        <p className={styles.askLabel}>
                            Ask a question — answered from your saved notes when possible,
                            or general knowledge otherwise.
                        </p>

                        <div className={styles.askInputWrapper}>
                            <input
                                type="text"
                                className={styles.askInput}
                                placeholder="e.g. What does useEffect do in React?"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleAskQuestion()}
                            />
                            <button
                                className={styles.btnAsk}
                                onClick={handleAskQuestion}
                                disabled={isAsking || !question.trim()}
                            >
                                {isAsking ? <div className={styles.spinner} /> : <Send size={16} />}
                            </button>
                        </div>

                        {askError && (
                            <p style={{ color: "var(--rose)", fontSize: "0.85rem", marginTop: 10 }}>
                                {askError}
                            </p>
                        )}

                        <AnimatePresence>
                            {answer && (
                                <motion.div
                                    className={styles.answerBox}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <div className={styles.answerContent}>{answer}</div>
                                    <p className={styles.answerSource}>
                                        <CheckCircle2 size={12} />
                                        {usedNotes
                                            ? "Answered from your saved notes"
                                            : "Answered from general knowledge"}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* ── Saved Notes List (from the real database) ── */}
                {!isLoadingNotes && savedNotes.length > 0 && (
                    <div className={styles.savedSection}>
                        <h3 className={styles.savedTitle}>
                            <Save size={18} />
                            Saved Knowledge Base
                        </h3>
                        <div className={styles.savedGrid}>
                            <AnimatePresence>
                                {savedNotes.map((note) => (
                                    <motion.div
                                        key={note.id}
                                        className={styles.savedItem}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        layout
                                    >
                                        <p className={styles.savedItemText}>{note.text}</p>
                                        <div className={styles.savedItemActions}>
                                            <button
                                                className={styles.btnDeleteNote}
                                                onClick={() => handleDeleteNote(note.id)}
                                                title="Delete Note"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export default NotesPage;