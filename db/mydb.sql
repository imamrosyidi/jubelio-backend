PGDMP                     
    z            jubelio    15.0    15.0                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            	           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            
           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16398    jubelio    DATABASE     �   CREATE DATABASE jubelio WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE jubelio;
                postgres    false            �            1259    16450    images    TABLE     B   CREATE TABLE public.images (
    prod_id integer,
    src text
);
    DROP TABLE public.images;
       public         heap    postgres    false            �            1259    16436    product_list    TABLE     �   CREATE TABLE public.product_list (
    sku character(8) NOT NULL,
    name text,
    image text,
    price integer,
    description text
);
     DROP TABLE public.product_list;
       public         heap    postgres    false            �            1259    16443    products    TABLE     �   CREATE TABLE public.products (
    id integer NOT NULL,
    name text,
    sku character varying(9) NOT NULL,
    price numeric,
    description text NOT NULL
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    16453    test_id_seq    SEQUENCE     t   CREATE SEQUENCE public.test_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.test_id_seq;
       public          postgres    false    215                       0    0    test_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.test_id_seq OWNED BY public.products.id;
          public          postgres    false    217            m           2604    16454    products id    DEFAULT     f   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.test_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    215                      0    16450    images 
   TABLE DATA           .   COPY public.images (prod_id, src) FROM stdin;
    public          postgres    false    216   �                 0    16436    product_list 
   TABLE DATA           L   COPY public.product_list (sku, name, image, price, description) FROM stdin;
    public          postgres    false    214   �                 0    16443    products 
   TABLE DATA           E   COPY public.products (id, name, sku, price, description) FROM stdin;
    public          postgres    false    215   �                  0    0    test_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.test_id_seq', 66, true);
          public          postgres    false    217            q           2606    16458    products constraint_name 
   CONSTRAINT     R   ALTER TABLE ONLY public.products
    ADD CONSTRAINT constraint_name UNIQUE (sku);
 B   ALTER TABLE ONLY public.products DROP CONSTRAINT constraint_name;
       public            postgres    false    215            o           2606    16442    product_list products_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.product_list
    ADD CONSTRAINT products_pkey PRIMARY KEY (sku);
 D   ALTER TABLE ONLY public.product_list DROP CONSTRAINT products_pkey;
       public            postgres    false    214            s           2606    16449    products products_pkey1 
   CONSTRAINT     U   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey1 PRIMARY KEY (id);
 A   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey1;
       public            postgres    false    215               >  x���ˎ�0�u�.��ޖ�T�bTU�J�T���Ƕ�I4}�_RRiV�d�>~��o(�w���}.��t��y���aj@I�vތP\,k���}1YeD�
��(��I�%�.�A��_��}3���~�hVE�ݜ�E���{	kGc���2H�C�&`�
�����2�x��:�g�+�=�}Z�-��|OH���@B���K�>�`<q|��^9zV��x��TlD{� �R"ȗ���5�*M�2)�����t���,����5���E�t#�bkqd>}e?�v�����8���J��}lAk�}�,d�bDY�=r�*dy^/˹*dɵ�f	�nҽ΁� �&�x�]��5�nό�%�GZc���j�2�BN�P�tJ�B���^��E��
�"��2��.̀����Q!���ź�]ظ1kda(�{�����h5�<�
��������I���G��FЩ�.�4%�)1�xw�HX��=�)�M]���]��e[2o���核�W�y!^�0g�]�����9���q2/�K�P��W�y!^䶘#f�L��ko1�Ԧ*���
���j����0�         �   x�-�;�0��>�/@A�D���Y�ƿ�q�^�'"L7��~Z";{��+s�f<J�#eJ�{@רq�ݮ}o�V�r5�ʺv ��@��D��B#�fr��18��Ȯ>�lي���҅I�-�//J[v�H39���HTS�)
>���u�<         p  x�}�[w�8ǟ'����az0Ʒ�&��v�I�8۞��.$@I\?��v�d?��fFs�R�M���,D]�9�����QYi*���$y8b�t�&�OҞ�>l��I�X�PS:ڤ�4o�ۤ"6��$�U�L��&��'m��=�|�;��-m�sO9�gB` ǶR=̼O��4��!nDY�Oj�8:#Ν�dp^hU��%DL	�*���oe58?���eUЄ�ع��B-*�dĮ�K�p�[{_xJ9q��	9q>������Bl�1�dm�FV93�Lz��Ѳ^��t�%��%R񛕄�IT7�m�VVpG�r~o%Q�uO1����o����9�p�\�T������(�Jv5�v��cD������P)�_�s��C��%j�8���^�t��Ҷ�:��%��#Ѝ*C6�1���ៀ�����&j�V��Ϝ촤<u����pM�C�?B8�-vE���Z\o�2�s�h-���E\�`g�V�2(��{���Klb�.�_�R�-�<�b(�1��쓻������J#שF]��3[Ok7pMn�$gU�՘�t�i��w��aV���?��MPA�$�02��:vO����2���d�ɮ;-���htTg�VD9Ѡ� g�O�h�3�8�б.B�y�[��"lJH�&�&JL�X�+ؙ*��
1gm޴�T�c,�f�6jb������D�@��[E����a�݈� �a}䴓����23Øv�����lRcDx���}�,����
J����s���$ʝ�>���@�%��"ȱ�Xwe�t���oMPP��������a$������w�A�<��l4if�\�V�0�:��b�%l���1��6S~ۼ�X�����-�wX��iU��|�� hTqiFƌ\e��u�g�l��H@�����zc������In���TgH�1�6(5L��i{ r��7�m��QQS7�`E�mm�.�n0-��~A��_.�g\��c?����W�4��k�zշO_%ƫ���k�vΰ�4v��#]����^����fmNbKw�]=`��l6�u��ſݗ�Mc���#�Y�݂ͧ��'�pץ̟ƶ�b��1�Y��b�]q���,�r��M�z�\Oc??]]]��}R�     