import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CompanyCard({ company, showActions, onEdit, onDelete }) {
  return (
    <Box 
      display="flex" 
      justifyContent="space-between" 
      alignItems="center"
      sx={{ 
        p: 2, 
        mb: 1,
        border: '1px solid #3253aeff',
        borderRadius: 2,
        bgcolor: ' #3253ae10'
      }}
    >
      
      <Box display="flex" alignItems="center" gap={8}> 
        <Typography variant="h6" sx={{ color: '#0d61b4ff', fontWeight: 'bold' }}>
          {company.companyName}
        </Typography>
        <Typography variant="body1" >
          {company.phoneNumber}
        </Typography>
      </Box>
      
    
      {showActions && (
        <Box display="flex" gap={1}>
          <Button 
            variant="outlined" 
            size="small" 
            startIcon={<EditIcon />}
            onClick={() => onEdit(company)}
          >
            Редактировать
          </Button>
          <Button 
            variant="outlined" 
            color="error" 
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => onDelete(company.id)}
          >
            Удалить
          </Button>
        </Box>
      )}
    </Box>
  );
}