<?php include 'header.php'?>
    <div class="content">
        <p>
            
            <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                Post Job
            </button>
        </p>
        <div class="collapse" id="collapseExample">
            <div class="card card-body">
                <form method="POST" action="config.php">
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Company Name</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" name="cname" >
                        
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputposition1" class="form-label">Position</label>
                        <input type="text" class="form-control" id="exampleInputposition1" name="position">
                    </div>
                    <div class="mb-3">
                        <label for="JobDecription" class="form-label">Job Description</label>
                        <textarea class="form-control" id="JobDescription" name="jdesc"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="ctc" class="form-label">CTC</label>
                        <input type="text" class="form-control" id="ctc" name="ctc">
                    </div>

                    <button type="submit" class="btn btn-primary" name="submit_job">Submit</button>
                </form>            
        </div>

    </div>
    <table class="table">
        <thead>
            <tr>
                
                <th scope="col">Company Name</th>
                <th scope="col">Position</th>
                <th scope="col">Job Description</th>
                <th scope="col">CTC</th>
            </tr>
        </thead>
        <tbody>
            <?php
                $server ='localhost';
                $username ='root';
                $passwoerd ='';
                $database='jobs';
                
                $conn= mysqli_connect($server,$username,$passwoerd, $database);
                $sql="Select id,cname,position,jdescription,ctc from job";
                $result=mysqli_query($conn,$sql);
                if($result->num_rows>0){
                    while($rows=$result->fetch_assoc()){
                        $i=0;
                    echo"<tr>
                        
                        <td>".$rows['cname']."</td>
                        <td>".$rows['position']."</td>
                        <td>".$rows['jdescription']."</td>
                        <td>".$rows['ctc']."</td>
                        </tr>";
                    }
                }
                else{
                    echo"";
                }
                

            ?>
            
            
        </tbody>
    </table>

    <div id="candidates">
    
    </div>


    

    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>

</body>
</html>