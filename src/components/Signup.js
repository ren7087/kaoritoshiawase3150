import React, { useState } from "react";
import {
	Avatar,
	Alert,
	Button,
	TextField,
	Box,
	Typography,
	Container,
	Grid,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useSignup } from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Signup() {
	const { signup, error } = useSignup();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		signup(email, password);
	};

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: "success.main" }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					ユーザー登録
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="メールアドレス"
						name="email"
						autoComplete="email"
						autoFocus
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="パスワード"
						type="password"
						id="password"
						autoComplete="current-password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2, bgcolor: "success.main" }}
					>
						ユーザー登録
					</Button>
				</Box>
			</Box>
			<Grid container sx={{ justifyContent: "center" }}>
				<Grid item>
					<a href="/login">ログインはこちら</a>
				</Grid>
			</Grid>
			{error && <Alert severity="error">ユーザー登録できませんでした</Alert>}
		</Container>
	);
}
