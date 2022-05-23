import * as dotenv from 'dotenv';
import * as Joi from 'joi';

export class ConfigService {
  private readonly envConfig: dotenv.DotenvParseOutput;
  private readonly validationScheme = {
    PORT: Joi.number().default(4000),
    BASE_PATH: Joi.string().default('/'),

    POSTGRES_HOST: Joi.string().required(),
    POSTGRES_PORT: Joi.number().required(),
    POSTGRES_USER: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    POSTGRES_DB: Joi.string().required(),
    MAIL_USER: Joi.string().required(),
    MAIL_PASSWORD: Joi.string().required(),
  };

  constructor() {
    const nodeEnv = process.env.NODE_ENV;

    const configs: dotenv.DotenvParseOutput[] = [];

    const defaultEnvConfigPath = nodeEnv ? `.env.${nodeEnv}` : '.env';

    const defaultEnvConfig = dotenv.config({ path: defaultEnvConfigPath });

    if (defaultEnvConfig.error) {
      // tslint:disable-next-line: no-console
      console.log(`No config file at path: ${defaultEnvConfigPath}`);
    } else {
      configs.push(defaultEnvConfig.parsed);
      // tslint:disable-next-line: no-console
      console.log(`Loaded config file at path: ${defaultEnvConfigPath}`);
    }

    configs.push(process.env as dotenv.DotenvParseOutput);
    this.envConfig = this.validateInput(...configs);
  }

  public get(key: string): string {
    return this.envConfig[key];
  }

  public getNumber(key: string): number {
    return Number(this.get(key));
  }

  get port(): number {
    return Number(this.envConfig.PORT);
  }
  get basePath(): string {
    return this.envConfig.BASE_PATH;
  }

  get db() {
    return {
      host: String(this.envConfig.POSTGRES_HOST),
      port: String(this.envConfig.POSTGRES_PORT),
      username: String(this.envConfig.POSTGRES_USER),
      password: String(this.envConfig.POSTGRES_PASSWORD),
      database: String(this.envConfig.POSTGRES_DB),
    };
  }

  get mail() {
    return {
      user: String(this.envConfig.MAIL_USER),
      password: String(this.envConfig.MAIL_PASSWORD),
    };
  }

  private validateInput(
    ...envConfig: dotenv.DotenvParseOutput[]
  ): dotenv.DotenvParseOutput {
    const mergedConfig: dotenv.DotenvParseOutput = {};

    envConfig.forEach((config) => Object.assign(mergedConfig, config));

    const envVarsSchema: Joi.ObjectSchema = Joi.object(this.validationScheme);

    const result = envVarsSchema.validate(mergedConfig, { allowUnknown: true });
    if (result.error) {
      throw new Error(`Config validation error: ${result.error.message}`);
    }
    return result.value;
  }
}
