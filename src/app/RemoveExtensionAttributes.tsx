"use client"

import { useEffect } from 'react'

export default function RemoveExtensionAttributes() {
  useEffect(() => {
    // Remove extension-added attributes
    document.body.removeAttribute('cz-shortcut-listen')
    document.body.removeAttribute('data-lastpass-inline')
    document.body.removeAttribute('data-lastpass-username')
  }, [])

  return null
}