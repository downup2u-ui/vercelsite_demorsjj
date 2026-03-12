import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  Tooltip
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import WarningIcon from '@mui/icons-material/Warning';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { InvoiceStatus } from '../../services/invoiceService';

interface InvoiceStatusActionsProps {
  invoiceId: string;
  currentStatus: InvoiceStatus;
  onStatusChange: (invoiceId: string, newStatus: InvoiceStatus) => Promise<void>;
}

// 可用的状态变更选项
const availableStatusChanges: Record<InvoiceStatus, { status: InvoiceStatus; label: string; icon: JSX.Element }[]> = {
  draft: [
    { status: 'sent', label: '标记为已发送', icon: <SendIcon fontSize="small" /> }
  ],
  sent: [
    { status: 'paid', label: '标记为已付款', icon: <CheckCircleIcon fontSize="small" color="success" /> },
    { status: 'overdue', label: '标记为逾期', icon: <WarningIcon fontSize="small" color="error" /> },
    { status: 'cancelled', label: '标记为已取消', icon: <CancelIcon fontSize="small" /> }
  ],
  paid: [
    { status: 'sent', label: '重置为已发送', icon: <SendIcon fontSize="small" /> }
  ],
  overdue: [
    { status: 'paid', label: '标记为已付款', icon: <CheckCircleIcon fontSize="small" color="success" /> },
    { status: 'cancelled', label: '标记为已取消', icon: <CancelIcon fontSize="small" /> }
  ],
  cancelled: [
    { status: 'draft', label: '恢复为草稿', icon: <SendIcon fontSize="small" /> }
  ]
};

// 状态变更确认消息
const confirmationMessages: Record<InvoiceStatus, string> = {
  draft: '该操作将使发票处于草稿状态，可以继续编辑。',
  sent: '该操作将标记发票为已发送状态，表示发票已发送给客户。',
  paid: '该操作将标记发票为已付款状态，表示客户已支付此发票。',
  overdue: '该操作将标记发票为逾期状态，表示付款已超过到期日期。',
  cancelled: '该操作将标记发票为已取消状态，表示此发票不再有效。'
};

const InvoiceStatusActions: React.FC<InvoiceStatusActionsProps> = ({
  invoiceId,
  currentStatus,
  onStatusChange
}) => {
  // 菜单状态
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  // 确认对话框状态
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [statusToChange, setStatusToChange] = useState<InvoiceStatus | null>(null);
  const [processing, setProcessing] = useState(false);

  // 打开菜单
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // 关闭菜单
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // 选择状态变更
  const handleStatusSelect = (status: InvoiceStatus) => {
    setStatusToChange(status);
    setConfirmOpen(true);
    handleMenuClose();
  };

  // 关闭确认对话框
  const handleConfirmClose = () => {
    setConfirmOpen(false);
    setStatusToChange(null);
  };

  // 确认状态变更
  const handleConfirmStatusChange = async () => {
    if (!statusToChange) return;
    
    setProcessing(true);
    try {
      await onStatusChange(invoiceId, statusToChange);
      handleConfirmClose();
    } catch (error) {
      console.error('Failed to update invoice status:', error);
    } finally {
      setProcessing(false);
    }
  };

  // 获取当前状态可用的操作
  const availableActions = availableStatusChanges[currentStatus] || [];

  // 如果没有可用操作，则不渲染组件
  if (availableActions.length === 0) {
    return null;
  }

  return (
    <>
      <Box>
        <Tooltip title="更改状态">
          <Button
            variant="outlined"
            endIcon={<ArrowDropDownIcon />}
            onClick={handleMenuOpen}
            size="small"
          >
            更改状态
          </Button>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
        >
          {availableActions.map((action) => (
            <MenuItem key={action.status} onClick={() => handleStatusSelect(action.status)}>
              <ListItemIcon>
                {action.icon}
              </ListItemIcon>
              <Typography variant="inherit">{action.label}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* 确认对话框 */}
      <Dialog
        open={confirmOpen}
        onClose={processing ? undefined : handleConfirmClose}
      >
        <DialogTitle>确认状态变更</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {statusToChange && confirmationMessages[statusToChange]}
            确定要继续吗？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} disabled={processing}>
            取消
          </Button>
          <Button 
            onClick={handleConfirmStatusChange} 
            color="primary" 
            disabled={processing}
            variant="contained"
          >
            {processing ? '处理中...' : '确认'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InvoiceStatusActions; 