import * as bcrypt from 'bcryptjs';

export class bcryptService {
  async hash(password: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async compare(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
