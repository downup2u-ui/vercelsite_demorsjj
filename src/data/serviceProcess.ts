import { 
  PencilSquareIcon, 
  DocumentTextIcon, 
  CubeIcon, 
  TruckIcon 
} from '@heroicons/react/24/outline';

export interface ServiceProcess {
  name: string;
  description: string;
  icon: any; // 使用any类型，因为React组件类型比较复杂
}

export const serviceProcess: ServiceProcess[] = [
  {
    name: '提交需求',
    description: '在线填写您的设计需求，上传参考图片或3D模型文件。',
    icon: PencilSquareIcon
  },
  {
    name: '方案确认',
    description: '我们的设计师会与您沟通，确认设计方案和预算。',
    icon: DocumentTextIcon
  },
  {
    name: '模型制作',
    description: '根据确认的方案，使用专业设备进行3D打印制作。',
    icon: CubeIcon
  },
  {
    name: '成品交付',
    description: '完成后我们会进行质检，然后安排配送或自取。',
    icon: TruckIcon
  }
];
