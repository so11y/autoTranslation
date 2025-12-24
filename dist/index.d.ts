import { Plugin } from 'vite';
import { AgentOption } from './cache';
export default function (options: {
    agent: AgentOption;
}): Plugin[];
