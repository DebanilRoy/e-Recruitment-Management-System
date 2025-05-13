import { claudeConfig } from '../config/claude-config';

export class ClaudeService {
    private static instance: ClaudeService;

    private constructor() {}

    public static getInstance(): ClaudeService {
        if (!ClaudeService.instance) {
            ClaudeService.instance = new ClaudeService();
        }
        return ClaudeService.instance;
    }

    public enableForClient(clientId: string): boolean {
        return claudeConfig.enabled && 
               (claudeConfig.supportedClients.includes('*') || 
                claudeConfig.supportedClients.includes(clientId));
    }

    public getModelVersion(): string {
        return `${claudeConfig.version}-${claudeConfig.model}`;
    }
}

export const claudeService = ClaudeService.getInstance();
