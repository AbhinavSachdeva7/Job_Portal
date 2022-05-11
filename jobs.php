<?php include 'header.php' ?>

<div class="content">
<table class="table">
<thead>
            <tr>
                
                <th scope="col">Name</th>
                <th scope="col">Company</th>
                <th scope="col">Qualification</th>
                <th scope="col">Why Should we hire you</th>
                <th scope="col">Education</th>
            </tr>
        </thead>
        <tbody>
            <?php
                $server ='localhost';
                $username ='root';
                $passwoerd ='';
                $database='jobs';
                
                $conn= mysqli_connect($server,$username,$passwoerd, $database);
                $sql="Select id, name, quali, why, education, cname from candidates";
                $result=mysqli_query($conn,$sql);
                if($result->num_rows>0){
                    while($rows=$result->fetch_assoc()){
                        $i=0;
                    echo"<tr>
                        
                        <td>".$rows['name']."</td>
                        <td>".$rows['cname']."</td>
                        <td>".$rows['why']."</td>
                        <td>".$rows['quali']."</td>
                        <td>".$rows['education']."</td>
                        </tr>";
                    }
                }
                else{
                    echo"";
                }
                

            ?>
            
            
        </tbody>
        <!-- <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Candidates Name</th>
                <th scope="col">Position</th>
                <th scope="col">Resume</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Web Dev</td>
                <td><a href="" class="down_icon"><i class="fa fa-download" aria-hidden="true"></i></a></td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>ML/AI Engineer</td>
                <td><a href="" class="down_icon"><i class="fa fa-download" aria-hidden="true"></i></a></td>
            </tr>
            <tr>
                <th scope="row">3</th>
                <td>Will</td>
                <td>Software Engineer</td>
                <td><a href="" class="down_icon"><i class="fa fa-download" aria-hidden="true"></i></a></td>
            </tr>
        </tbody> -->
    </table>
</div>