import { eq } from "drizzle-orm";
import { db } from "../db";
import { InsertUser, SelectUser, userTable } from "../schema";

export async function getUserFromEmail(email: SelectUser["email"]) {
	return await db.select().from(userTable).where(eq(userTable.email, email));
}

export async function getUserFromId(id: SelectUser["id"]) {
	return await db.select().from(userTable).where(eq(userTable.id, id));
}

export async function createUser(user: InsertUser) {
	return await db
		.insert(userTable)
		.values(user)
		.returning({
			id: userTable.id,
			email: userTable.email,
			url: userTable.img_url,
		});
}

export async function verifyPassword(user: { email: SelectUser["email"]; passwordHash: SelectUser["passwordHash"]}){
	const userFromDb = await getUserFromEmail(user.email);
	if (!userFromDb) {
		return false;
	}
	return user.passwordHash === userFromDb[0].passwordHash;
}