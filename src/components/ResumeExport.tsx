"use client";
import React, { useMemo, useRef, useState } from "react";
import jsPDF from "jspdf";
import styles from "./ResumeExport.module.scss";
import Textarea from "@mui/joy/Textarea";
import AvatarEditor from "react-avatar-editor";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import {FaLinkedin} from "react-icons/fa";
import {PiCodeFill, PiLineVerticalLight} from "react-icons/pi";
import Text from "@/components/text/Text";
import EducationAndLanguages from "@/components/education-and-languages/EducationAndLanguages";
import FormControlLabel from "@mui/material/FormControlLabel";
import html2canvas from "html2canvas";

// ---------------- Types for JSON ----------------
type ExperienceItem = {
    title: string;          // e.g. "Frontend Developer"
    company: string;        // e.g. "TechCorp"
    project?: string;       // e.g. "E-commerce Platform"
    workType?: string;      // e.g. "Remote"
    date?: string;          // e.g. "09/2024 – 02/2025"
    accomplishments?: { id: number | string; text: string }[];
    languages?: string[];
    technologies?: string[];
};

type ResumeJSON = {
    profile?: {
        firstName?: string;
        lastName?: string;
        role?: string;
        location?: string;
        email?: string;
        linkedin?: string;     // URL
        portfolio?: string;    // URL
    };
    summary?: string;         // plain text
    skills?: string[];        // bullets
    experience?: ExperienceItem[];
    education?: {
        speciality?: string;
        university?: string;
    };
    languages?: { name: string; level: string }[];
};

// ---------------- Helper defaults ----------------
const emptyData: ResumeJSON = {
    profile: {},
    summary: "",
    skills: [],
    experience: [],
    education: {},
    languages: [],
};

const ResumeExport: React.FC = () => {
    const resumeRef = useRef<HTMLDivElement>(null);

    // -------- Avatar editor state ----------
    const [image, setImage] = useState<File | null>(null);
    const [scale, setScale] = useState(1.2);
    const [rotate, setRotate] = useState(0);
    const editorRef = useRef<AvatarEditor | null>(null);
    const [finalAvatar, setFinalAvatar] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [round, setRound] = useState(true);
    const [openScript, setOpenScript] = useState(false);

    const handleClose = () => {
        setImage(null);
        setOpen(false);
    };
    const fileInputRef = useRef<HTMLInputElement>(null);
    const openFileDialog = () => fileInputRef.current?.click();
    const onFileSelected: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const f = e.target.files?.[0];
        if (f) {
            setImage(f);
            setFinalAvatar(null);
            setOpen(true);
            e.currentTarget.value = "";
        }
    };

    const handleSaveAvatar = () => {
        if (editorRef.current) {
            const canvas = editorRef.current.getImageScaledToCanvas();
            setFinalAvatar(canvas.toDataURL());
            setImage(null);
            setOpen(false);
        }
    };

    const handleExport = async () => {
        if (!resumeRef.current) return;
        await new Promise((r) => setTimeout(r, 300));
        const element = resumeRef.current;
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
        });
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const pdf = new jsPDF({
            orientation: imgWidth > imgHeight ? "landscape" : "portrait",
            unit: "px",
            format: [imgWidth, imgHeight],
        });
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("Resume.pdf");
    };

    const [jsonText, setJsonText] = useState<string>(""); // за замовчуванням порожньо
    const [parseError, setParseError] = useState<string>("");

    const data: ResumeJSON = useMemo(() => {
        if (!jsonText.trim()) {
            setParseError("");
            return emptyData;
        }
        try {
            const parsed = JSON.parse(jsonText) as ResumeJSON;
            setParseError("");
            // легка нормалізація, щоб поля завжди були
            return {
                profile: parsed.profile ?? {},
                summary: parsed.summary ?? "",
                skills: parsed.skills ?? [],
                experience: parsed.experience ?? [],
                education: parsed.education ?? {},
                languages: parsed.languages ?? [],
            };
        } catch (e) {
            console.error("JSON parse error:", e);
            return emptyData;
        }
    }, [jsonText]);




    // -------- Derived header fields --------
    const fullName =
        [data.profile?.firstName, data.profile?.lastName]
            .filter(Boolean)
            .join(" ")
        || " "; // щоб не стрибав layout
    const role = data.profile?.role || "";
    const location = data.profile?.location || "";
    const email = data.profile?.email || "";
    const linkedin = data.profile?.linkedin || "";
    const portfolio = data.profile?.portfolio || "";

    return (
        <div className={styles.wrapper}>
            {/* hidden file input for avatar */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{display: "none"}}
                onChange={onFileSelected}
            />

            {/* Toolbar */}
            <div className={styles.toolbar}>
                <button onClick={handleExport} className={styles.exportBtn}>Export PDF</button>
                <button type="button" className={styles.exportBtn} onClick={openFileDialog}>
                    {finalAvatar ? "Change Avatar" : "Add Avatar"}
                </button>
                <button onClick={() => {
                    setOpenScript(true)
                }} className={styles.exportBtn}>Upload Script
                </button>

            </div>

            {/* JSON input */}

            {parseError && (
                <div style={{color: "#b91c1c", fontSize: 14, marginTop: 6}}>
                    JSON parse error: {parseError}
                </div>
            )}
            <Dialog open={openScript} onClose={() => setOpenScript(false)} maxWidth="md" fullWidth>
                <DialogTitle>Upload Script</DialogTitle>
                <DialogContent>
                    <Textarea
                        placeholder={`Paste your resume JSON here, e.g.:
{
  "profile": {
    "firstName": "Yaroslav",
    "lastName": "Tsarenko",
    "role": "Fullstack Developer",
    "location": "Ukraine",
    "email": "yaroslavtsarenkodev@gmail.com",
    "linkedin": "https://linkedin.com/in/your-profile",
    "portfolio": "https://portfolio.example.com"
  },
  "summary": "Short professional summary...",
  "skills": ["React", "Next.js", "Node.js"],
  "experience": [
    {
      "title": "Frontend Developer",
      "company": "TechCorp",
      "project": "E-commerce",
      "workType": "Remote",
      "date": "09/2024 – 02/2025",
      "accomplishments": [
        { "id": 1, "text": "Implemented SSR with Next.js" },
        { "id": 2, "text": "Improved performance by 40%" }
      ],
      "languages": ["JavaScript", "TypeScript"],
      "technologies": ["React", "Next.js", "Redux", "Jest"]
    }
  ],
  "education": {
    "speciality": "Computer Science",
    "university": "National University"
  },
  "languages": [
    { "name": "English", "level": "B2" },
    { "name": "Ukrainian", "level": "Native" },
    { "name": "Russian", "level": "Native" }
  ]
}`}
                        minRows={8}
                        sx={{width: "100%", margin: "0 auto"}}
                        value={jsonText}
                        onChange={(e) => setJsonText(e.target.value)}
                    />
                </DialogContent>
            </Dialog>
            {/* Avatar editor dialog */}
            <Dialog open={open && !!image && !finalAvatar} onClose={handleClose} maxWidth="xs" fullWidth>
                <DialogTitle>Configure Avatar</DialogTitle>
                <DialogContent>
                    <AvatarEditor
                        ref={editorRef}
                        image={image!}
                        width={255}
                        height={255}
                        border={40}
                        borderRadius={round ? 90 : 0}
                        color={[255, 255, 255, 0.6]}
                        scale={scale}
                        rotate={rotate}
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={round}
                                onChange={(_, checked) => setRound(checked)}
                                color="primary"
                            />
                        }
                        label="Round Avatar"
                        sx={{mt: 2}}
                    />
                    <div style={{marginTop: 16}}>
                        <label>Zoom</label>
                        <Slider
                            min={1}
                            max={3}
                            step={0.1}
                            value={scale}
                            onChange={(_, value) => setScale(Number(value))}
                            sx={{mb: 2}}
                        />
                        <label>Rotate</label>
                        <Slider
                            min={0}
                            max={360}
                            step={1}
                            value={rotate}
                            onChange={(_, value) => setRotate(Number(value))}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSaveAvatar} variant="contained" color="success">
                        Save Avatar
                    </Button>
                    <Button onClick={handleClose} color="error">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Printable page */}
            <div ref={resumeRef} className={styles.page}>
                <header className={styles.header}>
                    {finalAvatar && (
                        <img
                            src={finalAvatar}
                            alt="avatar"
                            className={styles.avatar}
                            crossOrigin="anonymous"
                            style={{width: 180, height: 180, borderRadius: round ? "50%" : "0%"}}
                        />
                    )}
                    <div className={styles.description}>
                        <h1>{fullName}</h1>
                        {role && <p>{role}</p>}

                        <div className={styles.contacts}>
                            {location && <span>{location}</span>}

                            {(linkedin || portfolio || email) && <PiLineVerticalLight size={45}/>}

                            {linkedin && (
                                <>
      <span>
        <FaLinkedin style={{color: "#0077b5"}}/>{" "}
          {linkedin.replace("https://www.linkedin.com/in/", "").replace(/\/$/, "")}
      </span>
                                    {(portfolio || email) && <PiLineVerticalLight size={45}/>}
                                </>
                            )}

                            {portfolio && (
                                <>
      <span>
        <PiCodeFill style={{color: "green"}}/>{" "}
          {portfolio.replace("https://", "").replace(/\/$/, "")}
      </span>
                                    {email && <PiLineVerticalLight size={45}/>}
                                </>
                            )}

                            {email && <span>{email}</span>}
                        </div>

                    </div>
                </header>

                <main className={styles.main}>
                    {/* Summary */}
                    {data.summary && (
                        <Text title="profile summary" description={data.summary}/>
                    )}

                    {/* Skills */}
                    {data.skills && data.skills.length > 0 && (
                        <Text
                            title="TECHNICAL SKILLS"
                            bullets={data.skills.map((s, i) => ({id: i, text: s}))}
                        />
                    )}

                    {/* Experience */}
                    {data.experience && data.experience.length > 0 && (
                        <>
                            <Text title="Work Experience"/>
                            {data.experience.map((exp, idx) => (
                                <Text
                                    key={idx}
                                    role={exp.title}
                                    company={exp.company}
                                    project={exp.project}
                                    workType={exp.workType}
                                    date={exp.date}
                                    accomplishments={exp.accomplishments}
                                    languages={exp.languages}
                                    technologies={exp.technologies}
                                />
                            ))}
                        </>
                    )}

                    {/* Education + Languages */}
                    {(data.education?.speciality || data.education?.university || (data.languages?.length ?? 0) > 0) && (
                        <EducationAndLanguages
                            speciality={data.education?.speciality}
                            university={data.education?.university}
                            languages={data.languages}
                        />
                    )}
                </main>
            </div>
        </div>
    );
};

export default ResumeExport;
