import type { Measure, MeasureStatus } from '@/types'

export function getMeasureStatus(m: Measure): MeasureStatus {
  if (m.systolic && m.systolic >= 180 || m.diastolic && m.diastolic >= 110 || m.pulse && m.pulse >= 130) return 'critical'
  if (m.systolic && m.systolic >= 140 || m.diastolic && m.diastolic >= 90 || m.pulse && m.pulse >= 100) return 'high'
  if (m.systolic && m.systolic >= 130 || m.diastolic && m.diastolic >= 85 || m.pulse && m.pulse >= 90) return 'warn'
  return 'ok'
}