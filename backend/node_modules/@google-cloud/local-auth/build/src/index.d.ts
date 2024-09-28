/**
 * This is used by several samples to easily provide an oauth2 workflow.
 */
import { OAuth2Client } from 'google-auth-library';
export interface LocalAuthOptions {
    keyfilePath: string;
    scopes: string[] | string;
}
export declare function authenticate(options: LocalAuthOptions): Promise<OAuth2Client>;
