export interface User {
    idUser: number;
    name: string;
    lastName: string;
    institutionalEmail: string;
    role: 'ADMIN' | 'USER'
}