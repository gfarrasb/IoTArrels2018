// Jordi Segura
// Març de 2018
// Aquest programa genera valors aleatoris simulant els valors de 5 sensors
// i els envia pel port serie.



int S1;
int S2;
int S3;
int S4;
int S5;
String Sensors;

void setup() {
Serial.begin(9600);
}

void loop() {
  S1 = random(300); 
  S2 = random(300); 
  S3 = random(300); 
  S4 = random(300); 
  S5 = random(300); 

  Sensors = (String)S1 + "," + (String)S2 + "," + (String)S3 + "," + (String)S4 + "," + (String)S5;
  Serial.println(Sensors);
  
  delay(5000);
}
