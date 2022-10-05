import { useState, useEffect } from "react";
import { firebaseApp } from "../Firebase";
import { getDoc, doc } from "firebase/firestore";
import { useAuthContext } from "../context/AuthContext";
import { Redirect } from "react-router-dom";
import { Box } from "@mui/system";
import { CircularProgress, Typography } from "@mui/material";

const db = firebaseApp.firestore;

export default function Result() {
	const [questionnaires, setQuestionnaires] = useState([]);
	const [loading, setLoading] = useState("not-loading");
	const { user } = useAuthContext();

	useEffect(() => {
		const getQuestionnaire = async () => {
			setLoading("loading");
			const docRef = doc(db, "questionnaires");
			const docSnap = await getDoc(docRef);
			setQuestionnaires(docSnap.data());
			setLoading("not-loading");
		};
		getQuestionnaire();
	}, []);

	if (!user) {
		return <Redirect to="/login" />;
	} else {
		if (!questionnaires) {
			return (
				<Box sx={{ display: "flex" }}>
					<CircularProgress
						style={{ textAlign: "center", marginTop: "25%", marginLeft: "50%" }}
					/>
				</Box>
			);
		}
		return (
			<Box>
				<Typography
					variant="h5"
					style={{ textAlign: "center", marginTop: "10%" }}
				>
					アンケートにご協力くださりありがとうございました
				</Typography>
				<img
					src="./img/thank.jpg"
					alt="logo"
					style={{ textAlign: "center", marginTop: "25px", marginLeft: "25%" }}
				/>
			</Box>
		);
	}
}
