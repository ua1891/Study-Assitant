import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar } from "lucide-react";
import styles from "../styles/StudyPlanModal.module.css";

function StudyPlanModal({ show, plan, onClose, courseTitle }) {
  if (!plan) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modal}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.header}>
              <h2 className={styles.title}>
                <Calendar className={styles.titleIcon} size={22} />
                Study Plan: {courseTitle}
              </h2>
              <button className={styles.closeBtn} onClick={onClose}>
                <X size={20} />
              </button>
            </div>

            <div className={styles.content}>
              <div className={styles.summaryBox}>
                {plan.summary}
              </div>

              <div className={styles.sessionsTimeline}>
                {plan.sessions.map((session, index) => (
                  <div key={index} className={styles.sessionCard}>
                    <span className={styles.sessionDay}>{session.day}</span>
                    <h3 className={styles.sessionTopic}>{session.topic}</h3>
                    <p className={styles.sessionFocus}>{session.focus}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default StudyPlanModal;
