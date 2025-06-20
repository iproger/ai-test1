interface Props {
  open: boolean
  onClose: () => void
}

export function CpuConfigEditor({ open, onClose }: Props) {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-end"
      onClick={onClose}
    >
      <div className="bg-white dark:bg-gray-800 w-80 h-full p-4" onClick={(e) => e.stopPropagation()}>
        <h2 className="font-bold mb-2">CPU Config Editor</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}
