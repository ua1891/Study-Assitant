import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Sparkles, MessageCircle, Trash2, Send, Save } from "lucide-react";
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

    useEffect(() => {
        const stored = localStorage.getItem("studyAssistantNotes");
        if (stored) {
            setSavedNotes(JSON.parse(stored));
        }
    }, []);

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
                        Paste your study materials, generate summaries, and chat with your notes.
                    </p>
                </div>

                <div className={styles.layout}>
                    {/* ── Left: Your Note + AI Summary ── */}
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

                        {/* AI Summary Output */}
                        {(isSummarizing || summary.length > 0) && (
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
                                    <ul className={styles.summaryList}>
                                        {summary.map((point, index) => (
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
                                )}
                            </motion.div>
                        )}
                    </div>

                    {/* ── Right: Ask My Notes ── */}
                    <div className={styles.askCard}>
                        <h3 className={styles.askCardTitle}>
                            <MessageCircle size={18} />
                            Chat with your Notes
                        </h3>

                        <p className={styles.askLabel}>Ask a question based on your saved notes below.</p>

                        <div className={styles.askInputWrapper}>
                            <input
                                type="text"
                                className={styles.askInput}
                                placeholder="e.g. What are the key concepts of thermodynamics?"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleAskQuestion()}
                            />
                            <button
                                className={styles.btnAsk}
                                onClick={handleAskQuestion}
                                disabled={isAsking || !question.trim() || savedNotes.length === 0}
                            >
                                {isAsking ? <div className={styles.spinner} /> : <Send size={16} />}
                            </button>
                        </div>

                        {/* Answer Box */}
                        <AnimatePresence>
                            {answer && (
                                <motion.div
                                    className={styles.answerBox}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <div className={styles.answerContent}>
                                        {answer}
                                    </div>
                                    <p className={styles.answerSource}>
                                        <CheckCircle2 size={12} /> Answered from your saved notes
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* ── Saved Notes List ── */}
                {savedNotes.length > 0 && (
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

// Needed CheckCircle2 import specifically for the notes page source indicator
import { CheckCircle2 } from "lucide-react";

export default NotesPage;