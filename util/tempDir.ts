import { mkdtempSync } from 'node:fs'
import os from 'node:os'
import { sep } from 'node:path'

export const tempDir = (): string => mkdtempSync(`${os.tmpdir()}${sep}`)
