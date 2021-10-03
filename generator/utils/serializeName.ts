import { pascalCase } from 'change-case';

export function serializeName(name: string): string {
    return pascalCase(name)
        .replaceAll('_', '');
}