// vitest.setup.ts
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

// Extend Vitest's expect with jest-dom matchers (toBeInTheDocument, etc.)
expect.extend(matchers);

console.log('Vitest setup complete: Matchers extended.');
