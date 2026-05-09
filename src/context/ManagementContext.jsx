import { createContext, useState, useContext, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";

const ManagementContext = createContext();

export function useManagement() {
    return useContext(ManagementContext);
}

export function ManagementProvider({ children }) {
    const { user } = useAuth();
    const [schools, setSchools] = useState([]);
    const [nurses, setNurses] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [stats, setStats] = useState({ totalSchools: 0, totalNurses: 0, totalActiveStudents: 0 });
    const [activeSessions, setActiveSessions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            fetchData();
        }
    }, [user]);

    const normalizeSchool = (s) => {
        if (!s) return s;
        const id = s.id || s.schoolId;
        return {
            ...s,
            id: id,
            schoolId: id,
            name: s.name || s.schoolName,
            schoolName: s.name || s.schoolName,
            phoneNumber: s.phoneNumber || s.phone,
            phone: s.phoneNumber || s.phone,
            isScreeningUnlocked: (s.isScreeningUnlocked !== undefined ? s.isScreeningUnlocked : s.screeningUnlocked) ?? false,
            screeningUnlocked: (s.isScreeningUnlocked !== undefined ? s.isScreeningUnlocked : s.screeningUnlocked) ?? false
        };
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const isAdmin = user?.role?.toLowerCase() === "admin";
            const questionsUrl = isAdmin ? "/admin/questions" : "/screening/questions";

            const requests = [
                api.get("/schools"),
                api.get("/auth/nurses"),
                api.get(questionsUrl)
            ];

            if (isAdmin) {
                requests.push(api.get("/admin/schools/statistics"));
            }

            const results = await Promise.all(requests);
            const schoolsRes = results[0];
            const nursesRes = results[1];
            const questionsRes = results[2];
            const statsRes = isAdmin ? results[3] : null;

            let schoolsData = schoolsRes.data;

            // Role-based school filtering for nurses
            if (user?.role?.toUpperCase() === "NURSE" && user?.assignments) {
                schoolsData = schoolsData.filter(s =>
                    user.assignments.includes(s.id) ||
                    user.assignments.includes(s.schoolId)
                );
            }

            setSchools(schoolsData.map(normalizeSchool));
            setNurses(nursesRes.data);
            setQuestions(questionsRes.data.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
            if (statsRes) setStats(statsRes.data);
        } catch (err) {
            console.error("Failed to fetch management data:", err);
        } finally {
            setLoading(false);
        }
    };

    // --- School Actions ---
    const addSchool = async (schoolData) => {
        try {
            const payload = {
                schoolName: schoolData.name,
                address: schoolData.address,
                principalName: schoolData.principalName,
                phoneNumber: schoolData.phoneNumber || schoolData.phone,
                govtRegId: schoolData.govtRegId
            };
            const res = await api.post("/auth/register/school", payload);
            setSchools(prev => [...prev, normalizeSchool(res.data)]);
            return true;
        } catch (err) {
            console.error("Failed to add school:", err);
            return false;
        }
    };

    const updateSchool = async (id, updatedData) => {
        try {
            const payload = {
                schoolName: updatedData.name || updatedData.schoolName,
                address: updatedData.address,
                principalName: updatedData.principalName,
                phoneNumber: updatedData.phoneNumber || updatedData.phone,
                govtRegId: updatedData.govtRegId,
                isScreeningUnlocked: updatedData.isScreeningUnlocked,
                screeningUnlocked: updatedData.isScreeningUnlocked // Support both naming conventions
            };

            // Remove purely undefined fields
            Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);

            const res = await api.put(`/admin/schools/${id}`, payload);
            const normalized = normalizeSchool(res.data);

            setSchools(prev => prev.map(old => {
                if (old.id == id || old.schoolId == id) {
                    // ROBUST MERGE: Only overwrite with defined non-null values from normalized data
                    const merged = { ...old };
                    Object.keys(normalized).forEach(key => {
                        if (normalized[key] !== undefined && normalized[key] !== null) {
                            merged[key] = normalized[key];
                        }
                    });
                    return merged;
                }
                return old;
            }));
            return true;
        } catch (err) {
            console.error("Failed to update school:", err);
            return false;
        }
    };

    const deleteSchool = async (id) => {
        try {
            await api.delete(`/admin/schools/${id}`);
            setSchools(prev => prev.filter(s => s.id !== id && s.schoolId !== id));
            return true;
        } catch (err) {
            console.error("Failed to delete school:", err);
            return false;
        }
    };

    // --- Nurse Actions ---
    const addNurse = async (nurseData) => {
        try {
            const payload = {
                name: nurseData.name,
                email: nurseData.email,
                password: nurseData.password,
                schoolIds: nurseData.schoolIds || []
            };
            const res = await api.post("/auth/register/nurse", payload);
            setNurses(prev => [...prev, res.data]);
            return true;
        } catch (err) {
            const msg = err.response?.data?.message || err.message;
            console.error("Failed to add nurse:", msg);
            return false;
        }
    };

    const updateNurse = async (id, updatedData) => {
        try {
            const res = await api.put(`/admin/nurses/${id}`, updatedData);
            setNurses(prev => prev.map(n => n.id === id ? res.data : n));
            return true;
        } catch (err) {
            console.error("Failed to update nurse:", err);
            return false;
        }
    };

    const deleteNurse = async (id) => {
        try {
            await api.delete(`/admin/nurses/${id}`);
            // Backend does soft delete (sets isActive = false), so update local state to match
            setNurses(prev => prev.map(n => n.id === id ? { ...n, isActive: false } : n));
            return true;
        } catch (err) {
            console.error("Failed to deactivate nurse:", err);
            return false;
        }
    };

    const reactivateNurse = async (id) => {
        try {
            await api.patch(`/admin/nurses/${id}/reactivate`);
            setNurses(prev => prev.map(n => n.id === id ? { ...n, isActive: true } : n));
            return true;
        } catch (err) {
            console.error("Failed to reactivate nurse:", err);
            return false;
        }
    };

    const assignNurseToSchool = async (nurseId, schoolIds) => {
        try {
            await api.put(`/auth/nurse/${nurseId}/assignments`, schoolIds);
            fetchData();
            return true;
        } catch (err) {
            console.error("Failed to assign nurse:", err);
            return false;
        }
    };

    // --- Question Actions ---
    const addQuestion = async (questionData) => {
        try {
            const payload = {
                ...questionData,
                code: questionData.code || questionData.questionText.toLowerCase()
                    .replace(/[^a-z0-9]/g, '_')
                    .substring(0, 20) + "_" + Math.floor(Math.random() * 1000)
            };
            const res = await api.post("/admin/questions", payload);
            setQuestions(prev => [...prev, res.data].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
            return true;
        } catch (err) {
            console.error("Failed to add question:", err);
            return false;
        }
    };

    const editQuestion = async (id, updatedData) => {
        try {
            const res = await api.put(`/admin/questions/${id}`, updatedData);
            setQuestions(prev => prev.map(q => q.id === id ? res.data : q).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
            return true;
        } catch (err) {
            console.error("Failed to edit question:", err);
            return false;
        }
    };

    const deleteQuestion = async (id) => {
        try {
            await api.delete(`/admin/questions/${id}`);
            // Backend does soft delete (sets isActive = false), so update local state to match
            setQuestions(prev => prev.map(q => q.id === id ? { ...q, isActive: false } : q));
            return true;
        } catch (err) {
            console.error("Failed to delete question:", err);
            return false;
        }
    };

    const toggleQuestion = async (id) => {
        try {
            const res = await api.patch(`/admin/questions/${id}/toggle`);
            setQuestions(prev => prev.map(q => q.id === id ? res.data : q).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
            return true;
        } catch (err) {
            console.error("Failed to toggle question:", err);
            return false;
        }
    };

    // --- Screening Session Actions ---
    const createSession = async (sessionData) => {
        try {
            const res = await api.post("/sessions/create", sessionData);
            setActiveSessions(prev => [res.data, ...prev]);
            return res.data;
        } catch (err) {
            console.error("Failed to create session:", err);
            return null;
        }
    };

    const fetchActiveSessions = async () => {
        try {
            const res = await api.get("/sessions/active");
            setActiveSessions(res.data);
            return res.data;
        } catch (err) {
            console.error("Failed to fetch active sessions:", err);
            return [];
        }
    };

    const endSession = async (sessionId) => {
        try {
            await api.post(`/sessions/${sessionId}/end`);
            setActiveSessions(prev => prev.filter(s => s.id !== sessionId));
            return true;
        } catch (err) {
            console.error("Failed to end session:", err);
            return false;
        }
    };

    const value = {
        schools,
        addSchool,
        updateSchool,
        deleteSchool,
        nurses,
        addNurse,
        updateNurse,
        deleteNurse,
        reactivateNurse,
        assignNurseToSchool,
        questions,
        stats,
        addQuestion,
        editQuestion,
        deleteQuestion,
        toggleQuestion,
        activeSessions,
        createSession,
        fetchActiveSessions,
        endSession,
        loading,
        refresh: fetchData
    };

    return <ManagementContext.Provider value={value}>{children}</ManagementContext.Provider>;
}
