<?php 
header("Content-Type: application/vnd.ms-excel");
header("Content-Disposition: attachment; filename=".$filename.".xls");
header("Pragma: no-cache");
header("Expires: 0");  ?>

<body>
    <h1>Data Karyawan</h1>
    <table border="1" cellpadding="5" cellspacing="5">
        <thead>
            <tr>
                <th>Branch Name</th>
                <th>Employee Code</th>
                <th>Employee Name</th>
                <th>Bank Name</th>
                <th>BPJS Name</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach($data as $row): ?>
            <tr>
                <td><?php echo $row['branchName']; ?></td>
                <td><?php echo $row['employeeCode']; ?></td>
                <td><?php echo $row['employeeName']; ?></td>
                <td><?php echo $row['bankName']; ?></td>
                <td><?php echo $row['bpjsName']; ?></td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</body>