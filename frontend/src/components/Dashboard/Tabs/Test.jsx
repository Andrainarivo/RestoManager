import React from 'react'

const Test = () => {
  return (
    <div  className='flex items-center justify-center h-[80vh] '>
    Je suis dans la page de test
    {/* import { z } from "zod";

// creating a schema for strings
const mySchema = z.string();

// parsing
mySchema.parse("tuna"); // => "tuna"
mySchema.parse(12); // => throws ZodError

// "safe" parsing (doesn't throw error if validation fails)
mySchema.safeParse("tuna"); // => { success: true; data: "tuna" }
mySchema.safeParse(12); // => { success: false; error: ZodError } */}
    </div>
  )
}

export default Test
