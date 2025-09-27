'use client';
import { LoginForm } from '@/components/auth/LoginForm';
import { useAuthStore } from '@/store/authStore';
import { LoginRequest } from '@/types/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
	const { loading, login, error } = useAuthStore();
	const [data, setData] = useState<LoginRequest>({
		username: '',
		password: '',
	});
	const router = useRouter();

	const handleLogin = async (credentials: LoginRequest) => {
		try {
			await login(credentials);
			router.push('/dashboard');
		} catch (err) {
			console.error('Login failed:', err);
		}
	};

	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setData((prev) => ({ ...prev, username: e.target.value }));
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setData((prev) => ({ ...prev, password: e.target.value }));
	};

	return (
		<div>
			<LoginForm
				username={data.username}
				password={data.password}
				onLogin={handleLogin}
				usernameChange={handleUsernameChange}
				passwordChange={handlePasswordChange}
				loading={loading}
				error={error}
			/>
		</div>
	);
}
