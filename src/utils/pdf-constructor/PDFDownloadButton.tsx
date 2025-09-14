"use client"

import { useEffect, useRef, useState } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { ResumePDF } from '../../templates/resume-template-1/ResumePDF';
import styles from './PDFDownloadButton.module.scss';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Cropper from 'react-easy-crop';
import Slider from '@mui/material/Slider';
import Textarea from '@mui/joy/Textarea';
type CroppedArea = { x: number; y: number; width: number; height: number };
type ResumeData = typeof defaultResumeData;
const defaultResumeData = {
    header: {
        fullName: "John Doe",
        role: "Full-Stack Developer",
        country: "USA",
        linkedinLink: "https://linkedin.com/in/johndoe",
        portfolioLink: "https://johndoe.dev",
        email: "johndoe@example.com",
    },
    summary:
        "Experienced Full-Stack Developer skilled in building scalable applications with React, Next.js, and Node.js. Passionate about clean code, performance, and delivering value to clients.",
    keywords: [
        "JavaScript", "TypeScript", "React", "Next.js",
        "Node.js", "Express", "MongoDB", "PostgreSQL", "AWS", "Docker"
    ],
    technicalSkills: [
        "React, Next.js, Redux, Zustand",
        "Node.js, Express, GraphQL",
        "MongoDB, PostgreSQL, Firebase",
        "CI/CD, Docker, AWS, Vercel"
    ],
    experiences: [
        {
            company: "TechCorp",
            role: "Frontend Developer",
            project: "E-commerce Platform",
            date: "2021 - Present",
            type: "Remote",
            accomplishment: [
                "Developed and maintained a high-traffic e-commerce platform",
                "Improved page speed by 35% with code optimization"
            ],
            languagesAndTechnologies: ["React", "TypeScript", "Next.js"],
        },
    ],
    education: {
        university: "Example University",
        speciality: "Computer Science",
    },
    languages: [
        { name: "English", level: "Fluent" },
        { name: "German", level: "Intermediate" },
    ],
};

function getCroppedImg(imageSrc: string, croppedAreaPixels: CroppedArea): Promise<string> {
    return new Promise((resolve) => {
        const image = new window.Image();
        image.src = imageSrc;
        image.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = croppedAreaPixels.width;
            canvas.height = croppedAreaPixels.height;
            ctx?.drawImage(
                image,
                croppedAreaPixels.x,
                croppedAreaPixels.y,
                croppedAreaPixels.width,
                croppedAreaPixels.height,
                0,
                0,
                croppedAreaPixels.width,
                croppedAreaPixels.height
            );
            resolve(canvas.toDataURL('image/jpeg'));
        };
    });
}

function getATSFileName(resumeData: ResumeData) {
    const header = resumeData?.header || {};
    const fullName = header.fullName ? header.fullName.replace(/[^a-zA-Z0-9]/g, "_") : "Default";
    const roleRaw = header.role || "Developer";
    const words = roleRaw.split(/[\s\-]+/);
    const mainKeywords = ["Developer", "Engineer", "Analyst", "Designer", "Manager", "Architect"];
    let main = "Developer";
    let rest: string[] = [];
    for (const word of words) {
        if (mainKeywords.includes(word)) {
            main = word;
        } else {
            rest.push(word);
        }
    }
    if (!mainKeywords.includes(main) && words.length > 0) {
        main = words[words.length - 1];
        rest = words.slice(0, -1);
    }
    const restRole = rest.length ? rest.join("_") : "General";
    return `CV_${main}_${restRole}_${fullName}.pdf`;
}
export function PDFDownloadButton() {
    const [pdfKey, setPdfKey] = useState(0);
    const [avatar, setAvatar] = useState<string | null>(null);
    const [croppedAvatarPreview, setCroppedAvatarPreview] = useState<string | null>(null);
    const [openCrop, setOpenCrop] = useState(false);
    const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedArea | null>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);
    const [openScriptDialog, setOpenScriptDialog] = useState(false);
    const [script, setScript] = useState('');
    const [scriptInput, setScriptInput] = useState('');

    useEffect(() => {
        const savedAvatar = localStorage.getItem('resume_avatar');
        if (savedAvatar) setAvatar(savedAvatar);

        const savedScript = localStorage.getItem('resume_script');
        if (savedScript) setScript(savedScript);
    }, []);
    const [jsonInput, setJsonInput] = useState(
        JSON.stringify(defaultResumeData, null, 2)
    );
    const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);

    useEffect(() => {
        const savedData = localStorage.getItem("resume_data");
        if (savedData) {
            try {
                setResumeData(JSON.parse(savedData));
                setJsonInput(savedData);
            } catch {
                console.warn("Invalid JSON in localStorage, using default");
            }
        }
    }, []);

    const scriptInputRef = useRef<HTMLInputElement>(null);
    const avatarInputRef = useRef<HTMLInputElement>(null);

    const onRefresh = () => setPdfKey(prev => prev + 1);
    const onUploadScript = () => setOpenScriptDialog(true);
    const onAddAvatar = () => avatarInputRef.current?.click();

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result as string);
                setOpenCrop(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const onCropComplete = async (_: unknown, croppedAreaPixels: CroppedArea) => {
        if (imageSrc) {
            const preview = await getCroppedImg(imageSrc, croppedAreaPixels);
            setCroppedAvatarPreview(preview);
        }
    };

    const handleCropSave = async () => {
        if (croppedAvatarPreview) {
            setAvatar(croppedAvatarPreview);
            localStorage.setItem('resume_avatar', croppedAvatarPreview);
            setOpenCrop(false);
            setPdfKey(prev => prev + 1);
        }
    };

    // Handle script save
    const handleScriptSave = () => {
        setScript(scriptInput);
        localStorage.setItem('resume_script', scriptInput);
        setOpenScriptDialog(false);
        setPdfKey(prev => prev + 1);
    };


    const handleJsonSave = () => {
        try {
            const parsed = JSON.parse(jsonInput);
            setResumeData(parsed);
            localStorage.setItem("resume_data", JSON.stringify(parsed, null, 2));
            setPdfKey((prev) => prev + 1);
            setOpenScriptDialog(false);
        } catch {
            alert("Invalid JSON format");
        }
    };


    return (
        <div className={styles.wrapper}>
            <div className={styles.fixedButtonContainer}>
                <Button variant="contained" style={{ textTransform: 'capitalize' }} onClick={onRefresh}>
                    Refresh Resume
                </Button>
                <Button variant="contained" style={{ textTransform: 'capitalize' }} onClick={onUploadScript}>
                    Upload Script
                </Button>
                <Button variant="contained" style={{ textTransform: 'capitalize', textDecoration: "none" }} component="span">
                    {isClient && (
                        <PDFDownloadLink
                            style={{color: "inherit", textDecoration: "none"}}
                            document={<ResumePDF avatar={avatar} data={resumeData} />}
                            fileName={getATSFileName(resumeData)}>
                            {({ loading }) => (loading ? 'Generating PDF...' : 'Download Resume')}
                        </PDFDownloadLink>
                    )}
                </Button>
                <Button variant="contained" style={{ textTransform: 'capitalize' }} onClick={onAddAvatar}>
                    Add Avatar
                </Button>
                <input
                    type="file"
                    accept=".js,.ts"
                    style={{ display: 'none' }}
                    ref={scriptInputRef}
                />
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    ref={avatarInputRef}
                    onChange={handleAvatarChange}
                />
            </div>
            {isClient && (
                <PDFViewer key={pdfKey} width="1000" height="1200" style={{ border: '1px solid #ccc' }}>
                    <ResumePDF avatar={avatar} data={resumeData} />
                </PDFViewer>
            )}
            <Dialog open={openScriptDialog} onClose={() => setOpenScriptDialog(false)} maxWidth="sm" fullWidth>
                <div style={{ padding: 24 }}>
                    <Textarea
                        minRows={12}
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                        placeholder={JSON.stringify(defaultResumeData, null, 2)}
                        sx={{ fontFamily: "monospace", fontSize: 14, width: "100%" }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                        <Button variant="contained" onClick={handleJsonSave} style={{ marginRight: 8 }}>
                            Save
                        </Button>
                        <Button variant="outlined" onClick={() => setOpenScriptDialog(false)}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Dialog>
            <Dialog open={openCrop} onClose={() => setOpenCrop(false)} maxWidth="sm" fullWidth>
                <div style={{ position: 'relative', width: '100%', height: 400, background: '#333' }}>
                    {imageSrc && (
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                        />
                    )}
                </div>
                <div style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {croppedAvatarPreview && (
                        <img src={croppedAvatarPreview} alt="Preview" style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 16 }} />
                    )}
                    <Slider
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        onChange={(_, value) => setZoom(value as number)}
                    />
                    <div style={{display: 'flex', justifyContent: 'flex-end', width: '100%', marginTop: 16}}>
                        <Button variant="contained" onClick={handleCropSave} style={{ marginRight: 8 }}>
                            Save
                        </Button>
                        <Button variant="outlined" onClick={() => setOpenCrop(false)}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}