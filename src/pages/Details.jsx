import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  styled,
  Button,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useActions } from '../hooks/files/useActions';
import LoadingPage from '../components/global/LoadingPage';
import WrapperSection from '../components/global/WrapperSection';
import EmptyContent from '../components/global/EmptyContent';
import jsPDF from 'jspdf'; // لإضافة PDF
import 'jspdf-autotable'; // لتنسيق الجدول في PDF
import * as XLSX from 'xlsx'; // لإضافة Excel

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const Details = () => {
  const { id, groupId } = useParams(); // الحصول على الـ id من الـ Route

  const { actions, isPending, error } = useActions({ group_id: groupId, user_id: id });

  if (isPending) return <LoadingPage />;

  if (error || !actions?.data) {
    return (
      <WrapperSection>
        <EmptyContent
          title="No Actions Found"
          description="No actions available for this ID."
        />
      </WrapperSection>
    );
  }

  // وظيفة لتصدير البيانات كـ PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Actions for Document', 14, 10); // عنوان الوثيقة
    const tableData = actions.data.map((action, index) => [
      index + 1,
      action.action || 'N/A',
      action.user?.name ? `${action.user.name} (${action.user.email})` : 'Unknown',
      action.document?.file_name || 'N/A',
      new Date(action.created_at).toLocaleString('en-US'),
    ]);
    doc.autoTable({
      head: [['#', 'Action Name', 'Performed By', 'Document Name', 'Date']],
      body: tableData,
    });
    doc.save(`Actions_Document_${id}.pdf`);
  };

  // وظيفة لتصدير البيانات كـ Excel
  const exportToExcel = () => {
    const tableData = actions.data.map((action, index) => ({
      '#': index + 1,
      'Action Name': action.action || 'N/A',
      'Performed By': action.user?.name
        ? `${action.user.name} (${action.user.email})`
        : 'Unknown',
      'Document Name': action.document?.file_name || 'N/A',
      Date: new Date(action.created_at).toLocaleString('en-US'),
    }));
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Actions');
    XLSX.writeFile(workbook, `Actions_Document_${id}.xlsx`);
  };

  return (
    <Box sx={{
      padding: 2,
      width: '90%',
      margin: 'auto',
      marginTop: 4,
    }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: 2,
        }}
      >
        <Button variant="contained" color="primary" onClick={exportToPDF} sx={{ marginRight: 2 }}>
          Export to PDF
        </Button>
        <Button variant="contained" color="secondary" onClick={exportToExcel}>
          Export to Excel
        </Button>
      </Box>
      <StyledTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Action Name</TableCell>
              <TableCell>Performed By</TableCell>
              <TableCell>Document Name</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {actions.data.map((action, index) => (
              <TableRow key={action.document.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{action.action || 'N/A'}</TableCell>
                <TableCell>
                  {action.user?.name
                    ? `${action.user.name} (${action.user.email})`
                    : 'Unknown'}
                </TableCell>
                <TableCell>{action.document?.file_name || 'N/A'}</TableCell>
                <TableCell>
                  {new Date(action.created_at).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Box>

  );
};

export default Details;
