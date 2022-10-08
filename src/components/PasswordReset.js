import React, { useState } from "react";
import {
  Avatar,
  Alert,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  Grid,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { usePasswordReset } from "../hooks/useAuth";

export default function PasswordReset() {
  const [email, setEmail] = useState("");
  const { success, error, passwordReset } = usePasswordReset();

  const handleSubmit = (event) => {
    event.preventDefault();
    passwordReset(email);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          パスワード再設定
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            送信
          </Button>
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid item>
              <Link href="login" variant="body2">
                戻る
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {error && (
        <Alert severity="error">メールアドレスに送信できませんでした</Alert>
      )}
      {success && (
        <Alert severity="success">
          メールアドレスに送信しました。
          <br />
          メールが届いていない場合、迷惑メールに振り分けられている可能性があります。
        </Alert>
      )}
    </Container>
  );
}
