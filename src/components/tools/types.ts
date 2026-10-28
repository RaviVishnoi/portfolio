import { LucideIcon } from 'lucide-react';

export type ToolCategory = 'cybersecurity' | 'web' | 'network';

export interface ToolItem {
  id: string;
  title: string;
  description: string;
  category: ToolCategory;
  tags: string[];
  icon: LucideIcon;
  badge?: string;
}
