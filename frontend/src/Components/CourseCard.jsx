import styles from "../styles/CourseCard.module.css";
import ExplanationPanel from "./ExplanationPanel";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Star, Heart, Trash2, Pencil } from "lucide-react";

function CourseCard({ id, title, description, duration, rating, onRemove, onEdit }) {
    const [interested, setInterested] = useState(0);
    const [topics, setTopics] = useState([]);
    const [newTopicTitle, setNewTopicTitle] = useState("");
    const [newTopicDesc, setNewTopicDesc] = useState("");

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/topics/course/${id}`)
            .then((res) => res.json())
            .then((data) => setTopics(data))
            .catch((err) => console.error("Error fetching topics:", err));
    }, [id]);

    function handleAddTopic(e) {
        e.preventDefault();
        if (!newTopicTitle.trim() || !newTopicDesc.trim()) return;

        fetch("http://127.0.0.1:8000/topics/addTopic", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                course_id: id,
                title: newTopicTitle,
                description: newTopicDesc,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setTopics((prev) => [...prev, data]);
                setNewTopicTitle("");
                setNewTopicDesc("");
            })
            .catch((err) => console.error("Error adding topic:", err));
    }

    function handleDeleteTopic(topicId) {
        fetch(`http://127.0.0.1:8000/topics/deleteTopic/${topicId}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then(() => {
                setTopics((prev) => prev.filter((t) => t.id !== topicId));
            })
            .catch((err) => console.error("Error deleting topic:", err));
    }

    return (
        <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <h1 className={styles.title}>{title}</h1>

            <div className={styles.meta}>
                <span className={styles.badge}>
                    <Clock size={14} />
                    {duration}
                </span>
                <span className={styles.badge + " " + styles.ratingBadge}>
                    <Star size={14} />
                    {rating}
                </span>
            </div>

            <ExplanationPanel explanation={description}>
                <div className={styles.topicsSection}>
                    <h3 className={styles.topicsHeader}>Topics</h3>
                    {topics.length > 0 ? (
                        <ul className={styles.topicList}>
                            {topics.map((topic) => (
                                <li key={topic.id} className={styles.topicItem}>
                                    <div className={styles.topicDetails}>
                                        <span className={styles.topicTitle}>{topic.title}</span>
                                        <span className={styles.topicDesc}>{topic.description}</span>
                                    </div>
                                    <button
                                        className={styles.btnDeleteTopic}
                                        onClick={() => handleDeleteTopic(topic.id)}
                                    >
                                        <Trash2 size={13} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className={styles.topicDesc}>No topics yet — add one below.</p>
                    )}

                    <form onSubmit={handleAddTopic} className={styles.addTopicForm}>
                        <input
                            type="text"
                            placeholder="Topic title"
                            value={newTopicTitle}
                            onChange={(e) => setNewTopicTitle(e.target.value)}
                            className={styles.topicInput}
                        />
                        <input
                            type="text"
                            placeholder="Topic description"
                            value={newTopicDesc}
                            onChange={(e) => setNewTopicDesc(e.target.value)}
                            className={styles.topicInput}
                        />
                        <button type="submit" className={styles.btnAddTopic}>
                            + Add Topic
                        </button>
                    </form>
                </div>
            </ExplanationPanel>

            <div className={styles.actions}>
                <button className={styles.btnInterested} onClick={() => setInterested((prev) => prev + 1)}>
                    <Heart size={14} />
                    Interested ({interested})
                </button>
                <button className={styles.btnRemove} onClick={() => onRemove(id)}>
                    <Trash2 size={14} />
                    Remove
                </button>
                <button
                    className={styles.btnEdit}
                    onClick={() => onEdit({ id, title, description, duration, rating })}
                >
                    <Pencil size={14} />
                    Edit
                </button>
            </div>
        </motion.div>
    );
}

export default CourseCard;