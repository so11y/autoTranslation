type UseKey = {
    translate: () => void;
};
export type AgentOption = {
    url: string;
    mode: string;
};
export declare const CacheContext: {
    awaitTranslate: Promise<void>;
    files: {};
    hasUseKey: Record<string, UseKey>;
    ignore: {};
    zh: {};
    en: {};
    agent: AgentOption;
    ready(id: string, content: string): Promise<{
        hasChinese: boolean;
        drop: (v: any) => Promise<any>;
    } | {
        hasChinese: boolean;
        drop?: undefined;
    }>;
    getByContent(content: string): string;
    coverToFile(): {
        zh: string;
        en: string;
    };
    outputFile: any;
    initCache(options: {
        agent: AgentOption;
    }): Promise<void>;
};
export {};
