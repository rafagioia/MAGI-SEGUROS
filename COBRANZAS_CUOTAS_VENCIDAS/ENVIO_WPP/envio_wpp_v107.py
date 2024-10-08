import os
import pandas as pd
import pywhatkit
import time
import pyautogui
from datetime import datetime
from dateutil.relativedelta import relativedelta
from tkinter import Tk
from tkinter.filedialog import askopenfilename
import pytesseract
from PIL import Image

# Función para detectar errores de envío mediante OCR
def detectar_error():
    # Tomar una captura de pantalla
    screenshot = pyautogui.screenshot()
    screenshot.save("screenshot.png")

    # Procesar la imagen con Tesseract
    img = Image.open("screenshot.png")
    text = pytesseract.image_to_string(img)

    # Buscar el mensaje de error en el texto
    if "el número de teléfono compartido a traves de la dirección URL no es válido" in text.lower():
        return True
    return False

# Verificar la fecha actual
current_date = datetime.now().date()
start_date = datetime(2024, 9, 25).date()
end_date = datetime(2024, 12, 25).date()

if not (start_date <= current_date <= end_date):
    print("Licencia del software vencida, por favor solicite una nueva licencia. CodeName RafaGioia.")
    exit()

# Mensaje que se enviará, con los campos que se formatearán
message = """
Estimado cliente,

Nos comunicamos de GIOIA SEGUROS para informarle que el seguro de su {marca}, patente: {patente}, {estado}. Si ya abonó la cuota del mismo, por favor desestime este mensaje.

Saludos.
*Gioia Seguros*

*IMPORTANTE TRANSFERENCIAS!* Toda transferencia que se haga fuera del horario laboral o *SIN CONSULTAR* antes por whatsapp, *NO SERÁ REGISTRADA*.

Cada pago *SIN EXCEPCIONES* debe enviar por whatsapp su *PATENTE* y su *SEGURO*, y *CONSULTAR* cuanto debe abonar.

*EVITE* transferir dinero sin consultar, ya que los pagos se pasan de manera manual con los datos que ustedes envian.

Si no envian datos, el dinero quedará en la cuenta, no se acreditará y se suspenderá la cobertura de la poliza.

"""

# Código de país, cámbialo según corresponda
country_code = '+54'

# Iniciar Tkinter y ocultar la ventana principal
Tk().withdraw()

# Abrir una ventana de diálogo para seleccionar el archivo
file_path = askopenfilename(
    filetypes=[("Text files", "*.txt")],
    title="Selecciona el archivo resultados.txt"
)

if not file_path:
    print("No se seleccionó ningún archivo. El programa terminará.")
    exit()

# Cargar el archivo TXT como un DataFrame de Pandas
data_df = pd.read_csv(file_path, delimiter=',', dtype={"WHATSAPP": str})

# Obtener lista única de IDs de clientes
cliente_list = data_df["ID"]
unique_cliente_list = list(dict.fromkeys(cliente_list))

# Obtener la fecha actual sin la parte de la hora
current_date = datetime.now().date()

# Listas para almacenar los resultados de los envíos
envios_exitosos = []
envios_fallidos = []

# Iterar sobre cada cliente único
for cliente in unique_cliente_list:
    cliente_info = data_df[data_df["ID"] == cliente]
    last_payment_date = pd.to_datetime(cliente_info["vence"].iloc[0], dayfirst=True).date()

    # Sumar un mes a la fecha de último pago
    vencimiento_date = last_payment_date + relativedelta(months=1)

    # Calcular la diferencia en días entre la fecha actual y la fecha de vencimiento
    days_diff = (vencimiento_date - current_date).days

    # Determinar el estado del vencimiento
    if days_diff > 0:
        estado = f"se vence dentro de {days_diff} días"
    elif days_diff < 0:
        estado = f"se venció hace {-days_diff} días"
    else:
        estado = "se vence en el día de hoy"

    # Formatear el mensaje con la información del cliente
    formatted_message = message.format(
        marca=cliente_info["VEHICULO"].iloc[0],
        patente=cliente_info["PATENTE"].iloc[0],
        estado=estado
    )

    # Obtener el número de teléfono con el código de país
    phone_number = country_code + cliente_info["WHATSAPP"].iloc[0]

    try:
        # Intentar enviar el mensaje por WhatsApp
        pywhatkit.sendwhatmsg_instantly(phone_number, formatted_message)
        
        # Esperar un tiempo para que la página se cargue completamente
        time.sleep(60)  # Esperar 60 segundos después de abrir el enlace
        
        # Verificar si se muestra un popup de error
        if detectar_error():
            raise ValueError("Número inválido detectado a través de OCR.")

        # Presionar 'Enter' para enviar el mensaje
        pyautogui.press('enter')
        time.sleep(10)  # Esperar 10 segundos para que se complete el envío
        
        # Cerrar la pestaña activa
        pyautogui.hotkey('ctrl', 'w')

        # Si el envío es exitoso, agregar a la lista de éxitos
        envios_exitosos.append(f"Enviado a {phone_number} - Patente: {cliente_info['PATENTE'].iloc[0]}")

    except Exception as e:
        # Si ocurre un error, agregar a la lista de fallos
        error_message = f"Error al enviar a {phone_number} - Patente: {cliente_info['PATENTE'].iloc[0]}: {e}"
        print(error_message)
        envios_fallidos.append(error_message)

# Guardar los resultados en un archivo de log
log_file_path = os.path.join(os.path.dirname(file_path), 'resultado_envios.txt')

with open(log_file_path, 'w') as log_file:
    log_file.write("Resultados de los envíos:\n\n")

    log_file.write("Envíos exitosos:\n")
    for envio in envios_exitosos:
        log_file.write(envio + "\n")

    log_file.write("\nEnvíos fallidos:\n")
    for fallo in envios_fallidos:
        log_file.write(fallo + "\n")

print(f"Resultados guardados en: {log_file_path}")