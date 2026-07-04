import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useMeasures } from '@hooks/useMeasures'

export type Field = 'systolic' | 'diastolic' | 'pulse'

export const FIELDS: { key: Field; label: string; unit: string }[] = [
  { key: 'systolic',  label: 'Верхнее', unit: 'мм рт. ст.' },
  { key: 'diastolic', label: 'Нижнее',  unit: 'мм рт. ст.' },
  { key: 'pulse',     label: 'Пульс',   unit: 'уд/мин' },
]

export function useAddMeasure() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { add } = useMeasures()

  const isPulseOnly = searchParams.get('type') === 'pulse'
  const fields = isPulseOnly ? FIELDS.filter(f => f.key === 'pulse') : FIELDS

  const [values, setValues] = useState({ systolic: '', diastolic: '', pulse: '' })
  const [active, setActive] = useState<Field>(isPulseOnly ? 'pulse' : 'systolic')
  const [note, setNote] = useState('')

  function handleKey(key: string) {
    setValues(prev => {
      const cur = prev[active]
      if (key === '⌫') return { ...prev, [active]: cur.slice(0, -1) }
      if (cur.length >= 3) return prev
      return { ...prev, [active]: cur + key }
    })
  }

  async function handleSave() {
    const s = Number(values.systolic) || 0
    const d = Number(values.diastolic) || 0
    const p = Number(values.pulse) || 0
    if (isPulseOnly && !p) return
    if (!isPulseOnly && (!s || !d || !p)) return

    try {
      await add({
        systolic: s || null,
        diastolic: d || null,
        pulse: p || null,
        note,
      })
      navigate('/')
    } catch (e) {
      console.error('Save failed:', e)
    }
  }

  const activeField = fields.find(f => f.key === active)

  return {
    fields,
    values,
    active,
    note,
    activeField,
    setActive,
    setNote,
    handleKey,
    handleSave,
  }
}