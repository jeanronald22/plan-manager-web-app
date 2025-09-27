import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoginRequest } from '@/types/auth';

interface LoginProps {
	username: string;
	password: string;
	onLogin: (data: LoginRequest) => void;
	usernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	passwordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	loading: boolean;
	error: string | null;
}

export function LoginForm({
	username,
	password,
	onLogin,
	usernameChange,
	passwordChange,
	loading,
	error,
}: LoginProps) {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onLogin({ username, password });
	};

	return (
		<Card className="w-full max-w-md border-0">
			<CardHeader>
				<CardTitle>Login to your account</CardTitle>
				<CardDescription>
					Enter your username and password below to login to your
					account
				</CardDescription>
			</CardHeader>

			<CardContent>
				<form onSubmit={handleSubmit} className="flex flex-col gap-6">
					<div className="grid gap-2">
						<Label htmlFor="username">Username</Label>
						<Input
							id="username"
							type="text"
							placeholder="John Doe"
							required
							value={username}
							onChange={usernameChange}
						/>
					</div>

					<div className="grid gap-2">
						<div className="flex items-center">
							<Label htmlFor="password">Password</Label>
							<a
								href="#"
								className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
							>
								Forgot your password?
							</a>
						</div>
						<Input
							id="password"
							type="password"
							required
							value={password}
							onChange={passwordChange}
						/>
					</div>

					{error && <p className="text-red-500 text-sm">{error}</p>}

					<Button type="submit" className="w-full" disabled={loading}>
						{loading ? 'Logging in...' : 'Login'}
					</Button>
				</form>
			</CardContent>

			<CardFooter className="flex-col gap-2">
				<Button variant="outline" className="w-full">
					Sign up
				</Button>
			</CardFooter>
		</Card>
	);
}
