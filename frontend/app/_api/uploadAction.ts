// FILE: uploadAction.ts
'use server'

import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export async function upload(data: FormData) {
    const file: File | null = data.get('file') as unknown as File
    if (!file) {
        throw new Error('No file uploaded')
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadDir = join(process.cwd(), 'public/uploads')
    const filePath = join(uploadDir, file.name)
    // islan ko ang uploaddDir sa "/public"
    const filePath_netxjs = join("/uploads", file.name)

    try {
        // Ensure the upload directory exists
        await mkdir(uploadDir, { recursive: true })
        // Write the file to the filesystem
        await writeFile(filePath, new Uint8Array(buffer))
        console.log(`File uploaded successfully: ${filePath}`)
    } catch (error) {
        console.error('Error uploading file:', error)
        throw new Error('File upload failed')
    }

    return { success: true, filePath_netxjs }
}