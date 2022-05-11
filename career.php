<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <title>Career Page</title>
    <style>
        .banner{
            margin-top:28px;
            left:0px;
            width:100%;
            height:35vh; 
            z-index: 3;          
        }
        .banner_text{
            margin-top:-15rem;
            margin-left: 20em;
            z-index: 2;
            color: darkblue;

        }
        .banner_text h1{
            font-size: 3.5em;
        }

        .job_box_flex{
            display: flex;
            flex-flow: row wrap;
            /* position:absolute; */
            margin-top:9em;
            
            
               
        }

        .jobs .job_box{
            /* position: absolute; */
            margin-left: 2vh;
            margin-top: 2vh;
            border: solid 0.5px;
            border-radius: 15px;
            background-color: #2c2c2c;
            
            
            
            height: auto;
            width: 500px;
        }

        .jobs .job_box:hover{
            box-shadow: 0px 30px 65px 0px rgba(0, 0,0,0.4);
        }
        
        .jobs .job_box .content{
            padding-top: 20px;
            padding-bottom: 15px;
            margin-left: 20px;
            color: #ffffff;
        }

        .jobs .job_box .content h1{
            text-align: center;

        }

        .jobs .job_box .content h2{
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="position: fixed; left : 0px; top: 0px; right: 0px;" >
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Navbar</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Features</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Pricing</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link disabled">Disabled</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        
    </div>
    <div class="banner">
            <img src="https://cdn.phenompeople.com/CareerConnectResources/COGNGLOBAL/images/hero-banner-1538550408208.jpg" alt="" class="img-fluid img-responsive banner ">
            
    </div>
    <div class="banner_text">
        <p>
            <h1>Job Portal</h1><br>Find Jobs Matching Your Skill
            
        </p>
    </div>

    <!-- <div class="jobs">
        <div class="job_box">
            <div class="content"> -->
    <div class="job_box_flex  col-s-12">
            <?php
                $server ='localhost';
                $username ='root';
                $passwoerd ='';
                $database='jobs';
                
                $conn= mysqli_connect($server,$username,$passwoerd, $database);
                $sql="Select cname,position,jdescription,ctc from job";
                $result=mysqli_query($conn,$sql);
                if($result->num_rows>0){
                    while($rows=$result->fetch_assoc()){
                        $i=0;
                    
                    echo"<div class='jobs '>
                            <div class='job_box col-md-4'>
                                <div class='content  '>
                        
                                    <h1>".$rows['position']."</h1>
                                    <h2>".$rows['cname']."</h2>                        
                                    <p>".$rows['jdescription']."
                                    <br>
                                    <br>
                                    <b> CTC :</b>".$rows['ctc']."</p>
                                    <br>
                                    <button type='button' class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#exampleModal' data-bs-whatever='@fat'>Apply Now</button>
                                </div>
                            </div>
                        </div>";
                    }
                }
                else{
                    echo"";
                }
                

            ?>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Apply Now</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form method="post" action="config.php">
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Name</label>
            <input type="text" class="form-control" id="recipient-name" name="name">
          </div>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Company</label>
            <input type="text" class="form-control" id="recipient-name" name="company">
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Qualification</label>
            <textarea class="form-control" id="message-text" name="quali"></textarea>
          </div>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Why Should we hire you??</label>
            <textarea class="form-control" id="message-text" name="why"></textarea>
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Education</label>
            <textarea class="form-control" id="message-text" name="edu"></textarea>
          </div>

        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" name="apply">Apply</button>
        </form>
        
      </div>
    </div>
  </div>
</div>
                <!-- <h1>Position</h1>
                <h2>Company Name</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro excepturi neque pariatur vero fuga? Beatae dignissimos nesciunt adipisci, est, reiciendis natus ratione nam debitis unde similique laboriosam dolorum, labore incidunt.
                <br>
                <br>
                <b>skills Required : </b> Tere paas nahi hongi vo likhi hai
                <br>
                <br>
                <b>Location : </b>Kahi to hai
                <br>
                <br>
                <b>CTC : </b>Company Gareeb Ho Jayegi
                <br>

            </div>
        </div>
    </div> -->

    

    
    






    



    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
</body>
</html>